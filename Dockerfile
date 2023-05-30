# Use an official node runtime as a parent image
FROM node:lts

# Set the working directory in the container
WORKDIR /usr/src/app/gconnect-api

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that the application listens on
EXPOSE 5001

# Set the environment variable from .env file
ARG ENV_FILE
COPY ${ENV_FILE} .env

# Build the MYSQL server
FROM mysql:8

# Add mysql file to the container
COPY gconnect-db.sql /docker-entrypoint-initdb.d/

# Start the MYSQL server
CMD ["mysqld"]

# Define the command to run the application
CMD ["npm", "start"]

# TODO: complete this Dockerfile. It's not working well yet.