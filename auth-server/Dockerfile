FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy application source
COPY . .

# Expose the API port
EXPOSE 5000

# Seed the database each time the container starts to ensure demo data exists, then run dev server
CMD npm run seed && npm run dev
