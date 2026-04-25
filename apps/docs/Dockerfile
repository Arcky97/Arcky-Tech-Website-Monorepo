# ---------- BUILD ----------
FROM node:20 AS builder
WORKDIR /app

ARG NEXT_PUBLIC_WEB_URL
ARG NEXT_PUBLIC_DISCORD_URL

ENV NEXT_PUBLIC_WEB_URL=$NEXT_PUBLIC_WEB_URL
ENV NEXT_PUBLIC_DISCORD_URL=$NEXT_PUBLIC_DISCORD_URL

# Copy dependency files first (better caching)
COPY package.json package-lock.json ./

# Copy workspace structure
COPY apps/docs ./apps/docs
COPY packages ./packages

# Install deps
RUN npm ci

# Build only docs app
RUN npm run build --workspace=docs

# ---------- RUN ----------
FROM node:20 AS runner
WORKDIR /app

# Copy standalone output
COPY --from=builder /app/apps/docs/.next/standalone ./
COPY --from=builder /app/apps/docs/.next/static ./apps/docs/.next/static
COPY --from=builder /app/apps/docs/public ./apps/docs/public

EXPOSE 3000

CMD ["node", "apps/docs/server.js"]