# Stage 1: Install dependencies (Deps)
FROM node:22-alpine AS deps
# Install libc6-compat for compatibility with certain libraries
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./
# Install dependencies (use ci for deterministic installs)
RUN npm ci

# Stage 2: Build the project (Builder)
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable Next.js telemetry (optional)
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application
RUN SUPABASE_URL="https://example.supabase.co" \
    SUPABASE_ANON_KEY="dummy-key" \
    npm run build

# Stage 3: Production runner (Runner)
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a system user to avoid running as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/messages ./messages
COPY --from=builder --chown=nextjs:nodejs /app/i18n ./i18n

# Automatically generated standalone folder includes all dependencies
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 8080

ENV PORT=8080
# Bind hostname to ensure container is accessible externally
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]