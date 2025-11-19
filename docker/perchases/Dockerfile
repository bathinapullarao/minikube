# ===== First Stage: Build Stage =====
FROM node:18-alpine AS build

# Create app directory
WORKDIR /usr/src/app

# Copy package files (if you have package.json)
# COPY package*.json ./ || true

# Install only production deps
#RUN npm install --production || true

# Copy application source code
COPY . .

# ===== Second Stage: Runtime Stage =====
FROM node:18-alpine

WORKDIR /usr/src/app

# Copy only necessary files from build stage
COPY --from=build /usr/src/app /usr/src/app

# Expose port
EXPOSE 8091

# Start the app
CMD ["node", "app.js"]
