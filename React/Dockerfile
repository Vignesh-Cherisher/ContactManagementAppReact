# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=18.20.3

FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY . .
# Copy the built React files to the backend container
# Use an official node image to build the React React

RUN npm install

RUN npm run build

# Copy the Express server
COPY server.js .

# Expose the ports for FastAPI and Express
EXPOSE 3000

# Start the backend and React
CMD ["node","server.js"]

