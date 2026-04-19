# Build 
FROM node:20 AS builder
WORKDIR /app 

COPY package.json package-lock.json ./
COPY apps/docs ./apps/docs 
COPY packages ./packages 

RUN npm install 
RUN npm run build --workspace=docs 

# Run
FROM node:20 AS runner 
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/docs/.next ./apps/docs/.next
COPY --from=builder /app/apps/docs/public .apps/docs/public
COPY --from=builder /app/apps/docs/package.json ./apps/web/package.json

WORKDIR /app/apps/docs

EXPOSE 3091
CMD ["npm", "run", "start"]