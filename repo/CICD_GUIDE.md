# Arinox Website — CI/CD & Deployment Guide

---

## Do we actually need GCP for this project?

**Short answer: No.** Here's why:

Your project's actual dependencies are all external SaaS services:

| Service | Provider | Where it runs |
|---|---|---|
| Database + Auth | Supabase | Supabase cloud (external) |
| AI Chatbot | Groq | Groq cloud (external) |
| Emails | Gmail SMTP | Google (external) |
| Frontend | React/Vite | Served by the Express server |
| Backend | Express.js | The only thing running on GCP |

Your Express server is just a **middleman** — it proxies requests between the React frontend and these external APIs. There is zero GCP-specific code (no Cloud Storage, no Firestore, no BigQuery, no Pub/Sub, nothing).

You could host this exact same codebase — unchanged — on any of these:

| Platform | Monthly cost (approx) | Complexity |
|---|---|---|
| **Railway** | $5 | Zero config, GitHub auto-deploy built in |
| **Fly.io** | $5-10 | Simple CLI, auto-deploy via GitHub Actions |
| **Render** | $7-10 | Zero config, native GitHub auto-deploy |
| **DigitalOcean App Platform** | $5-12 | Simple, built-in CI |
| **GCP Cloud Run** (current) | $20-50+ | Load balancer + static IP add cost |
| **Hetzner VPS** | $4 | Full control, more setup work |

**Verdict:** GCP works and is already set up with your domain (`arinox.ai`), SSL, and load balancer. Migrating is optional — only worth it if GCP's bill is too high or you want simpler DX. For a fresh project like this, Railway or Render would be simpler and cheaper.

---

## Current deployment: manual PowerShell scripts

Right now, someone manually runs `.ps1` scripts from a Windows machine:

| Script | What it does | Where it deploys |
|---|---|---|
| `deploy.ps1` | Docker build → Cloud Run | Cloud Run (single service) |
| `deploy-production.ps1` | Docker build → Cloud Run + Load Balancer + SSL | `arinox.ai` |
| `deploy-staging.ps1` | Local build → App Engine (no Docker) | `staging-dot-arinox-staging.appspot.com` |

Problems with this approach:

- Manual — requires a person with `gcloud` auth and the right machine
- Windows-only (`.ps1` files don't run on Mac/Linux)
- No audit trail (who deployed what, when?)
- No rollback mechanism
- Server secrets parsed from a local `server/.env` file each time

---

## Goal: auto-deploy on `git push` to `main`

Push code to GitHub → GitHub Actions builds Docker → deploys to Cloud Run → site updates. No human touches anything.

---

## Step 1 — Initialize Git & create `.gitignore`

Run these commands from the `repo/` folder:

```powershell
git init
git add -A
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

Create `.gitignore` at the repo root with this content:

```gitignore
node_modules/
server/.env
client/.env
.env
.env.*
*.log
dist/
```

Then **immediately** untrack `server/.env` if it was already committed:

```bash
git rm --cached server/.env
git commit -m "remove .env from tracking"
git push
```

---

## Step 2 — Create a GCP Service Account for GitHub Actions

1. Go to [GCP Console → IAM → Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts)
2. Click **Create Service Account**
   - Name: `github-actions-deployer`
   - Description: "Used by GitHub Actions CI/CD to deploy to Cloud Run"
3. Grant these roles:
   - `Cloud Run Admin` (`roles/run.admin`)
   - `Cloud Build Editor` (`roles/cloudbuild.builds.editor`)
   - `Artifact Registry Writer` (`roles/artifactregistry.writer`)
   - `Service Account User` (`roles/iam.serviceAccountUser`)
4. Click **Done**
5. Open the new service account → **Keys** tab → **Add Key** → **Create new key** → **JSON**
6. Download the JSON file. **Keep it safe — this is a credential.**

---

## Step 3 — Add secrets to GitHub

Go to your GitHub repo: **Settings → Secrets and variables → Actions → New repository secret**

Add each of these:

| Secret Name | Source |
|---|---|
| `GCP_SA_KEY` | **Paste the entire contents** of the JSON key file from Step 2 |
| `GCP_PROJECT_ID` | `arinox-staging` |
| `SUPABASE_URL` | Copy from your `server/.env` |
| `SUPABASE_SERVICE_ROLE_KEY` | Copy from your `server/.env` |
| `JWT_SECRET` | Copy from your `server/.env` |
| `GROQ_API_KEY` | Copy from your `server/.env` |
| `EMAIL_HOST` | Copy from your `server/.env` |
| `EMAIL_PORT` | Copy from your `server/.env` |
| `EMAIL_USER` | Copy from your `server/.env` |
| `EMAIL_PASS` | Copy from your `server/.env` |
| `EMAIL_TO` | Copy from your `server/.env` |

---

## Step 4 — Create the GitHub Actions workflow

Create this file in your repo: `.github/workflows/deploy.yml`

```yaml
name: Deploy to GCP Cloud Run

on:
  push:
    branches: [main]

env:
  PROJECT_ID: ${{ secrets.GCP_PROJECT_ID }}
  REGION: asia-south1
  SERVICE: arinox-web
  REPO: arinox

jobs:
  deploy:
    runs-on: ubuntu-latest
    timeout-minutes: 15

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Authenticate to Google Cloud
        uses: google-github-actions/auth@v2
        with:
          credentials_json: ${{ secrets.GCP_SA_KEY }}

      - name: Set up gcloud CLI
        uses: google-github-actions/setup-gcloud@v2

      - name: Configure Docker for Artifact Registry
        run: |
          gcloud auth configure-docker \
            ${{ env.REGION }}-docker.pkg.dev --quiet

      - name: Build & push Docker image via Cloud Build
        run: |
          gcloud builds submit . \
            --tag="${{ env.REGION }}-docker.pkg.dev/${{ env.PROJECT_ID }}/${{ env.REPO }}/${{ env.SERVICE }}:latest" \
            --project=${{ env.PROJECT_ID }} \
            --timeout=1200 \
            --ignore-file=.dockerignore

      - name: Deploy to Cloud Run
        run: |
          gcloud run deploy ${{ env.SERVICE }} \
            --image="${{ env.REGION }}-docker.pkg.dev/${{ env.PROJECT_ID }}/${{ env.REPO }}/${{ env.SERVICE }}:latest" \
            --region=${{ env.REGION }} \
            --platform=managed \
            --allow-unauthenticated \
            --port=8080 \
            --memory=1Gi \
            --cpu=1 \
            --min-instances=1 \
            --max-instances=10 \
            --timeout=120 \
            --project=${{ env.PROJECT_ID }} \
            --set-env-vars="NODE_ENV=production,CLIENT_URL=https://www.arinox.ai,SITE_URL=https://www.arinox.ai,SUPABASE_URL=${{ secrets.SUPABASE_URL }},SUPABASE_SERVICE_ROLE_KEY=${{ secrets.SUPABASE_SERVICE_ROLE_KEY }},JWT_SECRET=${{ secrets.JWT_SECRET }},GROQ_API_KEY=${{ secrets.GROQ_API_KEY }},EMAIL_HOST=${{ secrets.EMAIL_HOST }},EMAIL_PORT=${{ secrets.EMAIL_PORT }},EMAIL_USER=${{ secrets.EMAIL_USER }},EMAIL_PASS=${{ secrets.EMAIL_PASS }},EMAIL_TO=${{ secrets.EMAIL_TO }}"

      - name: Show deployed URL
        run: |
          gcloud run services describe ${{ env.SERVICE }} \
            --region=${{ env.REGION }} \
            --project=${{ env.PROJECT_ID }} \
            --format="value(status.url)"
```

---

## Step 5 — Optional: staging auto-deploy

Create `.github/workflows/deploy-staging.yml`:

```yaml
name: Deploy Staging to App Engine

on:
  push:
    branches: [staging]

env:
  PROJECT_ID: ${{ secrets.GCP_PROJECT_ID }}

jobs:
  deploy-staging:
    runs-on: ubuntu-latest
    timeout-minutes: 15

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Authenticate to Google Cloud
        uses: google-github-actions/auth@v2
        with:
          credentials_json: ${{ secrets.GCP_SA_KEY }}

      - name: Set up gcloud CLI
        uses: google-github-actions/setup-gcloud@v2

      - name: Build React client
        run: |
          cd client
          npm ci
          npm run build
          cd ..

      - name: Install server production dependencies
        run: |
          cd server
          npm ci --omit=dev
          cd ..

      - name: Generate app.yaml
        run: |
          cat > _app_staging.yaml << 'YAMLEOF'
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
            NODE_ENV: 'production'
            PORT: '8080'
            CLIENT_URL: 'https://staging-dot-${{ env.PROJECT_ID }}.appspot.com'
            SITE_URL: 'https://staging-dot-${{ env.PROJECT_ID }}.appspot.com'
            SUPABASE_URL: '${{ secrets.SUPABASE_URL }}'
            SUPABASE_SERVICE_ROLE_KEY: '${{ secrets.SUPABASE_SERVICE_ROLE_KEY }}'
            JWT_SECRET: '${{ secrets.JWT_SECRET }}'
            GROQ_API_KEY: '${{ secrets.GROQ_API_KEY }}'
            EMAIL_HOST: '${{ secrets.EMAIL_HOST }}'
            EMAIL_PORT: '${{ secrets.EMAIL_PORT }}'
            EMAIL_USER: '${{ secrets.EMAIL_USER }}'
            EMAIL_PASS: '${{ secrets.EMAIL_PASS }}'
            EMAIL_TO: '${{ secrets.EMAIL_TO }}'

          handlers:
            - url: /.*
              script: auto
              secure: always
          YAMLEOF

      - name: Deploy to App Engine
        run: |
          gcloud app deploy _app_staging.yaml \
            --project=${{ env.PROJECT_ID }} \
            --quiet

      - name: Cleanup
        run: rm -f _app_staging.yaml
```

---

## How it works after setup

```
git push origin main
     │
     ▼
GitHub Actions triggered
     │
     ├─ Checkout code
     ├─ Auth to GCP (using service account key)
     ├─ gcloud builds submit → builds Docker image via Cloud Build
     └─ gcloud run deploy → pushes new revision to Cloud Run
     │
     ▼
https://arinox.ai updated
```

- **Production**: push to `main` → deploys to Cloud Run → live at `arinox.ai`
- **Staging**: push to `staging` → deploys to App Engine → live at `staging-dot-arinox-staging.appspot.com`
- **No Windows required** — runs on GitHub's Ubuntu runners
- **Every push is traceable** — GitHub Actions logs show who pushed, what was deployed, and the full build output

---

## Checklist

- [ ] `.gitignore` created and `server/.env` untracked
- [ ] Git repo initialized and pushed to GitHub
- [ ] GCP service account created with correct roles
- [ ] Service account JSON key downloaded
- [ ] All 11 GitHub secrets added
- [ ] `.github/workflows/deploy.yml` created and pushed
- [ ] Push to `main` to test
- [ ] (Optional) `.github/workflows/deploy-staging.yml` created for staging branch

---

## Security notes

- **Never commit `server/.env`** — it's already in `.gitignore`; verify with `git ls-files server/.env` (should return nothing)
- The service account JSON key in GitHub Secrets is encrypted at rest — only GitHub Actions has access during workflow runs
- Avoid printing secrets in workflow logs — the `--set-env-vars` flag is safe but don't `echo $SECRET` in scripts
- The GCP service account has broad permissions — rotate its key periodically (every 90 days recommended)
