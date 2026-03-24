FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy application source
COPY . .

# Expose Vite dev server port
EXPOSE 3000

# Run Vite bound to all network interfaces so it maps to the host
CMD npm run dev -- --host 0.0.0.0
