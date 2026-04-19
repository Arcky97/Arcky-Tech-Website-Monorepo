# Build
FROM node:20 AS builder
WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/web ./apps/web
COPY packages ./packages

RUN npm install
RUN npm run build --workspace=web

# Run
FROM node:20 AS runner
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/web/.next ./apps/web/.next
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder /app/apps/web/package.json ./apps/web/package.json

WORKDIR /app/apps/web

EXPOSE 3090
CMD ["npm", "run", "start"]