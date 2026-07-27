# ==============================================================
# Arinox AI - Production Deploy to GCP
# Deploys Cloud Run + Global Load Balancer + SSL for arinox.ai
# Usage: .\deploy-production.ps1
# ==============================================================

$GCLOUD   = "$env:LOCALAPPDATA\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd"
$PROJECT  = "arinox-staging"
$REGION   = "asia-south1"
$SERVICE  = "arinox-web"
$REPO     = "arinox"
$IMAGE    = "$REGION-docker.pkg.dev/$PROJECT/$REPO/$SERVICE"
$ROOT     = $PSScriptRoot
$DOMAIN   = "arinox.ai"
$WWW      = "www.arinox.ai"
$IP_NAME  = "arinox-prod-ip"
$CERT     = "arinox-ssl-cert"
$NEG      = "arinox-prod-neg"
$BACKEND  = "arinox-prod-backend"
$URLMAP   = "arinox-prod-urlmap"
$PROXY    = "arinox-prod-https-proxy"
$FWD_H    = "arinox-prod-http-fwd"
$FWD_S    = "arinox-prod-https-fwd"
$URLMAP_H = "arinox-prod-http-urlmap"
$PROXY_H  = "arinox-prod-http-proxy"

function GcloudExists {
    param([string[]]$Args)
    $null = & $GCLOUD @Args 2>$null
    return ($LASTEXITCODE -eq 0)
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Arinox AI - Production Deploy"             -ForegroundColor Cyan
Write-Host "  Project  : $PROJECT"                       -ForegroundColor Cyan
Write-Host "  Region   : $REGION"                        -ForegroundColor Cyan
Write-Host "  Service  : $SERVICE"                       -ForegroundColor Cyan
Write-Host "  Domain   : $WWW / $DOMAIN"                 -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Guard
$envFile = Join-Path $ROOT "server\.env"
if (-not (Test-Path $envFile)) {
    Write-Host "ERROR: server/.env not found." -ForegroundColor Red; exit 1
}

# Step 1: Enable required APIs
Write-Host "[1/9] Enabling required GCP APIs..." -ForegroundColor Yellow
& $GCLOUD services enable `
    run.googleapis.com `
    compute.googleapis.com `
    artifactregistry.googleapis.com `
    cloudbuild.googleapis.com `
    --project=$PROJECT --quiet
Write-Host "  APIs enabled." -ForegroundColor Green

# Step 2: Set project
Write-Host "[2/9] Setting GCP project..." -ForegroundColor Yellow
& $GCLOUD config set project $PROJECT --quiet

# Step 3: Build and push image via Cloud Build
Write-Host "[3/9] Building production image with Cloud Build..." -ForegroundColor Yellow
& $GCLOUD builds submit $ROOT `
    --tag="${IMAGE}:latest" `
    --project=$PROJECT `
    --timeout=1200 `
    --ignore-file=.dockerignore

if ($LASTEXITCODE -ne 0) { Write-Host "Cloud Build failed." -ForegroundColor Red; exit 1 }
Write-Host "  Image built: ${IMAGE}:latest" -ForegroundColor Green

# Step 4: Parse env vars
Write-Host "[4/9] Preparing environment variables..." -ForegroundColor Yellow
$skip = @('NODE_ENV', 'PORT', 'CLIENT_URL', 'SITE_URL')
$prodUrl = "https://$WWW"
$yamlLines = @(
    "NODE_ENV: production",
    "CLIENT_URL: '$prodUrl'",
    "SITE_URL: '$prodUrl'"
)
Get-Content $envFile | ForEach-Object {
    $line = $_.Trim()
    if ($line -and -not $line.StartsWith('#') -and $line -match '^([A-Za-z_][A-Za-z0-9_]*)=(.*)$') {
        $key   = $Matches[1].Trim()
        $value = $Matches[2].Trim().Trim('"').Trim("'")
        if ($key -notin $skip -and $value -ne '') {
            $safeVal = $value -replace "'", "''"
            $yamlLines += "${key}: '${safeVal}'"
        }
    }
}
$tmpYaml = Join-Path $env:TEMP "arinox-prod-env.yaml"
$yamlLines | Set-Content $tmpYaml -Encoding UTF8
Write-Host "  Loaded $($yamlLines.Count) env vars." -ForegroundColor Green

# Step 5: Deploy Cloud Run production service
Write-Host "[5/9] Deploying Cloud Run production service..." -ForegroundColor Yellow
& $GCLOUD run deploy $SERVICE `
    --image="${IMAGE}:latest" `
    --region=$REGION `
    --platform=managed `
    --allow-unauthenticated `
    --port=8080 `
    --memory=1Gi `
    --cpu=1 `
    --min-instances=1 `
    --max-instances=10 `
    --timeout=120 `
    --env-vars-file=$tmpYaml `
    --project=$PROJECT

Remove-Item $tmpYaml -ErrorAction SilentlyContinue
if ($LASTEXITCODE -ne 0) { Write-Host "Cloud Run deploy failed." -ForegroundColor Red; exit 1 }
Write-Host "  Cloud Run service deployed." -ForegroundColor Green

# Step 6: Reserve static global IP
Write-Host "[6/9] Reserving static global IP address..." -ForegroundColor Yellow
if (-not (GcloudExists @('compute', 'addresses', 'describe', $IP_NAME, '--global', "--project=$PROJECT"))) {
    & $GCLOUD compute addresses create $IP_NAME --global --ip-version=IPV4 --project=$PROJECT --quiet
    Start-Sleep -Seconds 5
}
$STATIC_IP = & $GCLOUD compute addresses describe $IP_NAME --global --project=$PROJECT --format="value(address)" 2>$null
Write-Host "  Static IP: $STATIC_IP" -ForegroundColor Green

# Step 7: Set up Load Balancer
Write-Host "[7/9] Setting up Load Balancer..." -ForegroundColor Yellow

# Serverless NEG pointing to Cloud Run
if (-not (GcloudExists @('compute', 'network-endpoint-groups', 'describe', $NEG, "--region=$REGION", "--project=$PROJECT"))) {
    & $GCLOUD compute network-endpoint-groups create $NEG `
        --region=$REGION `
        --network-endpoint-type=serverless `
        --cloud-run-service=$SERVICE `
        --project=$PROJECT --quiet
}

# Backend service
if (-not (GcloudExists @('compute', 'backend-services', 'describe', $BACKEND, '--global', "--project=$PROJECT"))) {
    & $GCLOUD compute backend-services create $BACKEND `
        --global `
        --load-balancing-scheme=EXTERNAL_MANAGED `
        --project=$PROJECT --quiet
    & $GCLOUD compute backend-services add-backend $BACKEND `
        --global `
        --network-endpoint-group=$NEG `
        --network-endpoint-group-region=$REGION `
        --project=$PROJECT --quiet
}

# HTTPS URL map
if (-not (GcloudExists @('compute', 'url-maps', 'describe', $URLMAP, '--global', "--project=$PROJECT"))) {
    & $GCLOUD compute url-maps create $URLMAP `
        --default-service=$BACKEND `
        --global `
        --project=$PROJECT --quiet
}

# SSL certificate (Google-managed)
if (-not (GcloudExists @('compute', 'ssl-certificates', 'describe', $CERT, '--global', "--project=$PROJECT"))) {
    & $GCLOUD compute ssl-certificates create $CERT `
        --domains="${DOMAIN},${WWW}" `
        --global `
        --project=$PROJECT --quiet
}

# HTTPS target proxy
if (-not (GcloudExists @('compute', 'target-https-proxies', 'describe', $PROXY, '--global', "--project=$PROJECT"))) {
    & $GCLOUD compute target-https-proxies create $PROXY `
        --url-map=$URLMAP `
        --ssl-certificates=$CERT `
        --global `
        --project=$PROJECT --quiet
}

# HTTPS forwarding rule
if (-not (GcloudExists @('compute', 'forwarding-rules', 'describe', $FWD_S, '--global', "--project=$PROJECT"))) {
    & $GCLOUD compute forwarding-rules create $FWD_S `
        --address=$IP_NAME `
        --target-https-proxy=$PROXY `
        --ports=443 `
        --global `
        --load-balancing-scheme=EXTERNAL_MANAGED `
        --project=$PROJECT --quiet
}

# HTTP -> HTTPS redirect URL map (import from temp yaml)
if (-not (GcloudExists @('compute', 'url-maps', 'describe', $URLMAP_H, '--global', "--project=$PROJECT"))) {
    $redirectYaml = @'
name: arinox-prod-http-urlmap
defaultUrlRedirect:
  redirectResponseCode: MOVED_PERMANENTLY_DEFAULT
  httpsRedirect: true
'@
    $tmpRedirect = Join-Path $env:TEMP "arinox-redirect-urlmap.yaml"
    $redirectYaml | Set-Content $tmpRedirect -Encoding UTF8
    & $GCLOUD compute url-maps import $URLMAP_H --global --project=$PROJECT --quiet --source=$tmpRedirect
    Remove-Item $tmpRedirect -ErrorAction SilentlyContinue
}

# HTTP target proxy
if (-not (GcloudExists @('compute', 'target-http-proxies', 'describe', $PROXY_H, '--global', "--project=$PROJECT"))) {
    & $GCLOUD compute target-http-proxies create $PROXY_H `
        --url-map=$URLMAP_H `
        --global `
        --project=$PROJECT --quiet
}

# HTTP forwarding rule
if (-not (GcloudExists @('compute', 'forwarding-rules', 'describe', $FWD_H, '--global', "--project=$PROJECT"))) {
    & $GCLOUD compute forwarding-rules create $FWD_H `
        --address=$IP_NAME `
        --target-http-proxy=$PROXY_H `
        --ports=80 `
        --global `
        --load-balancing-scheme=EXTERNAL_MANAGED `
        --project=$PROJECT --quiet
}

Write-Host "  Load Balancer configured." -ForegroundColor Green

# Step 8: Get Cloud Run URL
$RUN_URL = & $GCLOUD run services describe $SERVICE `
    --region=$REGION `
    --format="value(status.url)" `
    --project=$PROJECT

# Step 9: Done - show DNS instructions
Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "  PRODUCTION DEPLOYED SUCCESSFULLY!" -ForegroundColor Green
Write-Host "  Cloud Run URL: $RUN_URL" -ForegroundColor Green
Write-Host "  Static IP    : $STATIC_IP" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""
Write-Host "ACTION REQUIRED - Update GoDaddy DNS" -ForegroundColor Yellow
Write-Host "  Log in to GoDaddy -> DNS Management for arinox.ai" -ForegroundColor White
Write-Host ""
Write-Host "  Delete existing A records for root and www, then add:" -ForegroundColor White
Write-Host ""
Write-Host "  Type  Host  Value         TTL" -ForegroundColor Cyan
Write-Host "  A     @     $STATIC_IP  600" -ForegroundColor White
Write-Host "  A     www   $STATIC_IP  600" -ForegroundColor White
Write-Host ""
Write-Host "  SSL cert auto-provisions once DNS propagates (5-30 min)." -ForegroundColor Yellow
Write-Host "  Site will be live at https://www.arinox.ai after propagation." -ForegroundColor Green
Write-Host ""
