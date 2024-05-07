# Use an official Node.js runtime as a parent image
FROM node:17-alpine 

WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json .

# Install dependencies
RUN npm i

# Copy the rest of the application code to the working directory
COPY . .

CMD ["npm", "run", "dev"]
