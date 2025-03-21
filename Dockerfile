FROM node:18-slim

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy source code
COPY . .

# Set PORT environment variable for TCP mode
ENV PORT=8080

# Expose the port
EXPOSE 8080

# Command to run when container starts
CMD ["node", "src/tcp-server.js"] 