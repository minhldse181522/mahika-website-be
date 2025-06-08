# ---------- Development Base ----------
FROM node:20-alpine AS base
WORKDIR /app
RUN npm install -g pnpm

# ---------- Install deps ----------
FROM base AS deps
COPY package.json ./
RUN pnpm install

# ---------- Build App ----------
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build app và copy folder JSON i18n vào dist/generated/i18n
RUN pnpm build && mkdir -p dist/generated/i18n && cp -r src/i18n/* dist/generated/i18n
  
# ---------- Production ----------
FROM node:20-alpine AS production
WORKDIR /app

RUN mkdir -p src/generated
  
# Copy từ build stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
  
# i18n.generated.ts
COPY --from=builder /app/dist/generated/i18n ./dist/generated/i18n
  
ENV NODE_ENV=production
EXPOSE 3001
CMD ["node", "dist/main.js"]
  