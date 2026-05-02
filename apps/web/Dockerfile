# ---------- BUILD ----------
FROM node:20 AS builder
WORKDIR /app

ARG NEXT_PUBLIC_DOCS_URL
ARG NEXT_PUBLIC_DISCORD_URL
ARG NEXT_PUBLIC_WEB_URL

ENV NEXT_PUBLIC_DOCS_URL=$NEXT_PUBLIC_DOCS_URL
ENV NEXT_PUBLIC_DISCORD_URL=$NEXT_PUBLIC_DISCORD_URL
ENV NEXT_PUBLIC_WEB_URL=$NEXT_PUBLIC_WEB_URL

# Copy dependency files first (better caching)
COPY package.json package-lock.json ./

# Copy workspace structure
COPY apps/web ./apps/web
COPY packages ./packages

# Install deps
RUN npm ci

# Build only web app
RUN --mount=type=secret,id=API_KEY_WEBSITE \
    --mount=type=secret,id=API_BASE_URL \
    export API_KEY_WEBSITE=$(cat /run/secrets/API_KEY_WEBSITE) && \
    export API_BASE_URL=$(cat /run/secrets/API_BASE_URL) && \
    npm run build --workspace=web

# ---------- RUN ----------
FROM node:20 AS runner
WORKDIR /app

# Copy standalone output
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /app/apps/web/public ./apps/web/public

EXPOSE 3000

CMD ["node", "apps/web/server.js"]