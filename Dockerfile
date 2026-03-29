# ----------- Stage 1: Build -----------
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the SvelteKit app
RUN npm run build

# ----------- Stage 2: Run -----------
FROM node:20-alpine AS runner

WORKDIR /app

# Copy only necessary files
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

# Environment variables
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Start server
CMD ["node", "build"]