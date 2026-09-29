# ---------- BUILD ----------
FROM node:24 AS builder
WORKDIR /app

# Copy dependency files first (better caching)
COPY package.json package-lock.json ./

# Copy workspace structure
COPY apps/pbseditor ./apps/pbseditor
COPY packages ./packages

# Install deps
RUN npm ci

# Build only pbseditor app
RUN npm run build --workspace=pbseditor

# ---------- RUN ----------
FROM node:20 AS runner
WORKDIR /app

# Copy standalone output
COPY --from=builder /app/apps/pbseditor/.next/standalone ./
COPY --from=builder /app/apps/pbseditor/.next/static ./apps/pbseditor/.next/static
COPY --from=builder /app/apps/pbseditor/public ./apps/pbseditor/public

EXPOSE 3000

CMD ["node", "apps/pbseditor/server.js"]