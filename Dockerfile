# syntax=docker/dockerfile:1

# ---- Base deps ----
FROM node:20-alpine AS deps
WORKDIR /app
# Install dependencies based on the lockfile for reproducible builds
COPY package.json package-lock.json ./
RUN npm ci

# ---- Builder ----
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Build the Next.js app (produces .next/standalone with output: 'standalone')
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---- Runner ----
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# App listens on 8000
ENV PORT=8000
ENV HOSTNAME=0.0.0.0

# Run as a non-root user
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Copy the standalone output and static/public assets
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 8000

CMD ["node", "server.js"]
