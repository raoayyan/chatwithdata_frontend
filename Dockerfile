# Use official Node image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first (caching optimization)
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install dependencies (use pnpm, npm, or yarn based on your lockfile)
RUN npm install -g pnpm && pnpm install

# Copy all files
COPY . .

# Build the app
RUN pnpm build

# Expose port (optional since we're using host network)
EXPOSE 3000

# Start the app
CMD ["pnpm", "start"]