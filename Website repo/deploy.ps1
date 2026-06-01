# =============================================================
# Arinox AI — GCP Cloud Run Staging Deploy Script
# Usage: .\deploy.ps1
# Requires: gcloud CLI authenticated as assist@arinox.ai
# =============================================================

$ErrorActionPreference = "Stop"

# ── Config ────────────────────────────────────────────────
$GCLOUD  = "$env:LOCALAPPDATA\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd"
$PROJECT = "arinox-staging"
$REGION  = "asia-south1"
$SERVICE = "arinox-staging"
$REPO    = "arinox"
$IMAGE   = "$REGION-docker.pkg.dev/$PROJECT/$REPO/$SERVICE"
$ROOT    = $PSScriptRoot

# ── Banner ────────────────────────────────────────────────
Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Arinox AI — Cloud Run Staging Deploy" -ForegroundColor Cyan
Write-Host "  Project : $PROJECT" -ForegroundColor Cyan
Write-Host "  Region  : $REGION" -ForegroundColor Cyan
Write-Host "  Service : $SERVICE" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# ── Guard: server/.env must exist ─────────────────────────
$envFile = Join-Path $ROOT "server\.env"
if (-not (Test-Path $envFile)) {
    Write-Host "ERROR: server/.env not found." -ForegroundColor Red
    Write-Host "Copy server/.env.example to server/.env and fill in real values first." -ForegroundColor Yellow
    exit 1
}

# ── Step 1: Set project ───────────────────────────────────
Write-Host "[1/5] Setting GCP project..." -ForegroundColor Yellow
& $GCLOUD config set project $PROJECT 2>&1 | Out-Null

# ── Step 2: Ensure Artifact Registry repo exists ──────────
Write-Host "[2/5] Ensuring Artifact Registry repository..." -ForegroundColor Yellow
$repoCheck = & $GCLOUD artifacts repositories describe $REPO `
    --location=$REGION --project=$PROJECT 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "  Creating repository '$REPO'..."
    & $GCLOUD artifacts repositories create $REPO `
        --repository-format=docker `
        --location=$REGION `
        --description="Arinox AI Docker images" `
        --project=$PROJECT
} else {
    Write-Host "  Repository '$REPO' already exists."
}

# ── Step 3: Cloud Build ───────────────────────────────────
Write-Host "[3/5] Building image with Cloud Build (~4-6 min)..." -ForegroundColor Yellow
& $GCLOUD builds submit $ROOT `
    --tag="$IMAGE`:latest" `
    --project=$PROJECT `
    --timeout=1200

if ($LASTEXITCODE -ne 0) {
    Write-Host "Cloud Build failed. Check logs above." -ForegroundColor Red
    exit 1
}
Write-Host "  Image built: $IMAGE`:latest" -ForegroundColor Green

# ── Step 4: Parse server/.env → YAML ─────────────────────
Write-Host "[4/5] Preparing environment variables..." -ForegroundColor Yellow
$tmpYaml = Join-Path $env:TEMP "arinox-env-$([guid]::NewGuid().ToString('N').Substring(0,8)).yaml"

# Always force production values regardless of what's in .env
$skip = @('NODE_ENV', 'PORT')
$yamlLines = @(
    "NODE_ENV: production",
    "PORT: '8080'"
)

Get-Content $envFile | ForEach-Object {
    $line = $_.Trim()
    if ($line -and -not $line.StartsWith('#') -and $line -match '^([A-Za-z_][A-Za-z0-9_]*)=(.*)$') {
        $key   = $Matches[1].Trim()
        $value = $Matches[2].Trim().Trim('"').Trim("'")
        if ($key -notin $skip -and $value -ne '') {
            # YAML-safe: single-quote values, escape internal single quotes
            $safeVal = $value -replace "'", "''"
            $yamlLines += "$key`: '$safeVal'"
        }
    }
}

$yamlLines | Set-Content $tmpYaml -Encoding UTF8
Write-Host "  Loaded $($yamlLines.Count) env vars (including NODE_ENV + PORT overrides)."

# ── Step 5: Deploy to Cloud Run ───────────────────────────
Write-Host "[5/5] Deploying to Cloud Run..." -ForegroundColor Yellow
& $GCLOUD run deploy $SERVICE `
    --image="$IMAGE`:latest" `
    --region=$REGION `
    --platform=managed `
    --allow-unauthenticated `
    --port=8080 `
    --memory=1Gi `
    --cpu=1 `
    --min-instances=0 `
    --max-instances=5 `
    --timeout=120 `
    --env-vars-file=$tmpYaml `
    --project=$PROJECT

if ($LASTEXITCODE -ne 0) {
    Write-Host "Deploy failed." -ForegroundColor Red
    Remove-Item $tmpYaml -ErrorAction SilentlyContinue
    exit 1
}

# ── Get service URL ────────────────────────────────────────
$url = & $GCLOUD run services describe $SERVICE `
    --region=$REGION `
    --format="value(status.url)" `
    --project=$PROJECT

# ── Cleanup ────────────────────────────────────────────────
Remove-Item $tmpYaml -ErrorAction SilentlyContinue

# ── Done ──────────────────────────────────────────────────
Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "  DEPLOYED SUCCESSFULLY!" -ForegroundColor Green
Write-Host "  $url" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Open the URL above and verify the site loads."
Write-Host "  2. Update CLIENT_URL and SITE_URL in server/.env to:"
Write-Host "     $url"
Write-Host "  3. Re-run .\deploy.ps1 to apply the URL env vars."
Write-Host ""
