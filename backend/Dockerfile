FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only package files first to cache Docker layers
COPY package*.json ./

# Install dependencies and rebuild native modules in the container
RUN npm install

# Now copy the rest of the app
COPY . .

# Expose the port
EXPOSE 5001

# Run the app
CMD ["npm", "start"]
