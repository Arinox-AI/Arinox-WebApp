# =============================================================
# Arinox AI - App Engine Staging Deploy (NO Docker)
# Usage  : .\deploy-staging.ps1
# Deploys: https://staging-dot-arinox-staging.appspot.com
# =============================================================

$ErrorActionPreference = "Stop"

$GCLOUD  = "$env:LOCALAPPDATA\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd"
$PROJECT = "arinox-staging"
$ROOT    = $PSScriptRoot

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Arinox AI - App Engine Staging Deploy"   -ForegroundColor Cyan
Write-Host "  Project : $PROJECT"                       -ForegroundColor Cyan
Write-Host "  Service : staging"                        -ForegroundColor Cyan
Write-Host "  No Docker required"                       -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# -- Guard: server/.env must exist -------------------------
$envFile = Join-Path $ROOT "server\.env"
if (-not (Test-Path $envFile)) {
    Write-Host "ERROR: server/.env not found." -ForegroundColor Red
    Write-Host "Copy server/.env.example to server/.env and fill in real values." -ForegroundColor Yellow
    exit 1
}

# -- Step 1: Build React client ----------------------------
Write-Host "[1/4] Building React client..." -ForegroundColor Yellow
Set-Location (Join-Path $ROOT "client")
npm install --prefer-offline
npm run build
Write-Host "  Client built successfully." -ForegroundColor Green

# -- Step 2: Install server production dependencies --------
Write-Host "[2/4] Installing server production dependencies..." -ForegroundColor Yellow
Set-Location (Join-Path $ROOT "server")
npm ci --omit=dev --prefer-offline
Write-Host "  Server dependencies installed." -ForegroundColor Green

Set-Location $ROOT

# -- Step 3: Generate app.yaml with env vars ---------------
Write-Host "[3/4] Generating app.yaml with environment variables..." -ForegroundColor Yellow

$skip = @('NODE_ENV', 'PORT', 'CLIENT_URL', 'SITE_URL')
$envLines = @(
    "  NODE_ENV: 'production'",
    "  PORT: '8080'"
)

Get-Content $envFile | ForEach-Object {
    $line = $_.Trim()
    if ($line -and -not $line.StartsWith('#') -and $line -match '^([A-Za-z_][A-Za-z0-9_]*)=(.*)$') {
        $key = $Matches[1].Trim()
        $val = $Matches[2].Trim().Trim('"').Trim("'")
        if ($key -notin $skip -and $val -ne '') {
            $safeVal = $val -replace "'", "''"
            $envLines += "  $key`: '$safeVal'"
        }
    }
}

# Derive the staging URL for CORS/sitemap
$stagingUrl = "https://staging-dot-$PROJECT.appspot.com"
$envLines += "  CLIENT_URL`: '$stagingUrl'"
$envLines += "  SITE_URL`: '$stagingUrl'"

$appYamlContent = @"
runtime: nodejs22
service: staging
entrypoint: node server/src/app.js

automatic_scaling:
  min_instances: 0
  max_instances: 3
  target_cpu_utilization: 0.65

resources:
  cpu: 1
  memory_gb: 0.5
  disk_size_gb: 10

env_variables:
$($envLines -join "`n")

handlers:
  - url: /.*
    script: auto
    secure: always
"@

$tmpYaml = Join-Path $ROOT "_app_staging.yaml"
$appYamlContent | Set-Content $tmpYaml -Encoding UTF8
Write-Host "  app.yaml generated ($($envLines.Count) env vars)." -ForegroundColor Green

# -- Step 4: Deploy to App Engine --------------------------
Write-Host "[4/4] Deploying to App Engine (this takes ~3-5 min)..." -ForegroundColor Yellow
& $GCLOUD app deploy $tmpYaml `
    --project=$PROJECT `
    --quiet

$exitCode = $LASTEXITCODE

# Cleanup temp yaml (contains secrets - never leave it around)
Remove-Item $tmpYaml -ErrorAction SilentlyContinue

if ($exitCode -ne 0) {
    Write-Host "Deploy failed. Check the output above." -ForegroundColor Red
    exit 1
}

# -- Done --------------------------------------------------
Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "  DEPLOYED SUCCESSFULLY!" -ForegroundColor Green
Write-Host "  $stagingUrl" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""
Write-Host "Tip: View logs with:" -ForegroundColor Cyan
Write-Host "  gcloud app logs tail --service=staging --project=$PROJECT"
Write-Host ""
