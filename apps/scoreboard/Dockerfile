# ---------- BUILD ----------
FROM node:20 AS builder
WORKDIR /app

# Copy dependency files first (better caching)
COPY package.json package-lock.json ./

# Copy workspace structure
COPY apps/scoreboard ./apps/scoreboard
COPY packages ./packages

# Install deps
RUN npm ci

# Build only scoreboard app
RUN npm run build --workspace=scoreboard

# ---------- RUN ----------
FROM node:20 AS runner
WORKDIR /app

# Copy standalone output
COPY --from=builder /app/apps/scoreboard/.next/standalone ./
COPY --from=builder /app/apps/scoreboard/.next/static ./apps/scoreboard/.next/static
COPY --from=builder /app/apps/scoreboard/public ./apps/scoreboard/public

EXPOSE 3000

CMD ["node", "apps/scoreboard/server.js"]