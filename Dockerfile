# Base image
FROM node:22.16.0

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Build TypeScript
RUN npm run build

# Expose the port (make sure it matches your .env or default)
EXPOSE 5000

# Start the app
CMD ["npm", "start"]
