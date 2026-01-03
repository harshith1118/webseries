# Use an official Node.js runtime as a parent image
FROM node:20-slim

# Install FFmpeg
# We use 'slim' to keep it small, but need to update apt-get to install ffmpeg
RUN apt-get update && \
    apt-get install -y ffmpeg && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Create uploads and temp directories to prevent startup errors
RUN mkdir -p uploads temp

# Expose the port the app runs on
EXPOSE 5000

# Define the command to run the app
CMD ["npm", "start"]
