# Build
FROM node:20 AS builder
WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/scoreboard ./apps/scoreboard
COPY packages ./packages

RUN npm install
RUN npm run build --workspace=scoreboard

# Run
FROM node:20 AS runner
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/scoreboard/.next ./apps/scoreboard/.next
COPY --from=builder /app/apps/scoreboard/public ./apps/scoreboard/public
COPY --from=builder /app/apps/scoreboard/package.json ./apps/scoreboard/package.json

WORKDIR /app/apps/scoreboard

EXPOSE 3093
CMD ["npm", "run", "start"]