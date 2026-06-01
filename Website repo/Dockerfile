# ─────────────────────────────────────────────────────────
# Arinox AI — Single-container Cloud Run build
# Stage 1 : Build React/Vite client
# Stage 2 : Production Node.js server (serves API + static)
# ─────────────────────────────────────────────────────────

# ── Stage 1: Build client ────────────────────────────────
FROM node:18-alpine AS client-builder
WORKDIR /build/client

COPY client/package*.json ./
RUN npm ci --prefer-offline

COPY client/ ./
RUN npm run build

# ── Stage 2: Production server ───────────────────────────
FROM node:18-alpine AS production
WORKDIR /app/server

# Install only production dependencies
COPY server/package*.json ./
RUN npm ci --omit=dev --prefer-offline

# Copy server source
COPY server/src/ ./src/

# Copy React build to where app.js expects it:
# path.join(__dirname, '../../client/dist')
# __dirname = /app/server/src  →  /app/client/dist
COPY --from=client-builder /build/client/dist /app/client/dist

# Cloud Run sets PORT automatically (default 8080)
ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["node", "src/app.js"]
