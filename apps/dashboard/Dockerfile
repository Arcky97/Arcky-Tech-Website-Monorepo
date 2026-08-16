# ---------- BUILD ----------
FROM node:24 AS builder
WORKDIR /app

# Copy dependency files first (better caching)
COPY package.json package-lock.json ./

# Copy workspace structure
COPY apps/dashboard ./apps/dashboard
COPY packages ./packages

# Install deps
RUN npm ci

# Build only dashboard app
RUN npm run build --workspace=dashboard

# ---------- RUN ----------
FROM node:20 AS runner
WORKDIR /app

# Copy standalone output
COPY --from=builder /app/apps/dashboard/.next/standalone ./
COPY --from=builder /app/apps/dashboard/.next/static ./apps/dashboard/.next/static
COPY --from=builder /app/apps/dashboard/public ./apps/dashboard/public

EXPOSE 3000

CMD ["node", "apps/dashboard/server.js"]