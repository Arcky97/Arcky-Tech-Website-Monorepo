# ---------- BUILD ----------
FROM node:20 AS builder
WORKDIR /app

# Copy dependency files first (better caching)
COPY package.json package-lock.json ./

# Copy workspace structure
COPY apps/doggo-bot ./apps/doggo-bot
COPY packages ./packages

# Install deps
RUN npm ci

# Build only doggo-bot app
RUN npm run build --workspace=doggo-bot

# ---------- RUN ----------
FROM node:20 AS runner
WORKDIR /app

# Copy standalone output
COPY --from=builder /app/apps/doggo-bot/.next/standalone ./
COPY --from=builder /app/apps/doggo-bot/.next/static ./apps/doggo-bot/.next/static
COPY --from=builder /app/apps/doggo-bot/public ./apps/doggo-bot/public

EXPOSE 3000

CMD ["node", "apps/doggo-bot/server.js"]