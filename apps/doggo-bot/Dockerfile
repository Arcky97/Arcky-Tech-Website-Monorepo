# Build
FROM node:20 AS builder
WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/doggo-bot ./apps/doggo-bot
COPY packages ./packages

RUN npm install
RUN npm run build --workspace=doggo-bot

# Run
FROM node:20 AS runner
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/doggo-bot/.next ./apps/doggo-bot/.next
COPY --from=builder /app/apps/doggo-bot/public ./apps/doggo-bot/public
COPY --from=builder /app/apps/doggo-bot/package.json ./apps/doggo-bot/package.json

WORKDIR /app/apps/doggo-bot

EXPOSE 3092
CMD ["npm", "run", "start"]