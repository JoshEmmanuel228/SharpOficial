# Stage 1: Build Request Client
FROM node:18-alpine as client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Stage 2: Build API Server
FROM node:18-alpine as server-build
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install
COPY server/ ./
RUN npm run build

# Stage 3: Final Production Image
FROM node:18-alpine
WORKDIR /app

# Copy package.json and install production dependencies only
COPY server/package*.json ./
RUN npm install --production

# Copy built server files
COPY --from=server-build /app/server/dist ./dist

# Copy built client files to 'public' folder handled by server
# The server is configured to serve static files from ../public relative to dist/src
# So we place it in /app/public
COPY --from=client-build /app/client/build ./public

# Create data directory for local file storage persistence (Ephemeral in free tier)
RUN mkdir -p data
# Copy initial data (if any exists in source)
COPY --from=server-build /app/server/data ./data

EXPOSE 5000

CMD ["node", "dist/index.js"]
