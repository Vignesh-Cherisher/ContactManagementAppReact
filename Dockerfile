# Use an official Python image to run the FastAPI backend
ARG NODE_VERSION=18.20.3
FROM python:3.11.4 AS build

WORKDIR /app

# Copy the backend files and install dependencies
COPY backend/requirements.txt ./backend/
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy backend source code
COPY backend/. .

# Copy the built React files to the backend container
# Use an official node image to build the React React

FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY package.json .
RUN npm install

# Copy the React files and install dependencies
COPY React/package*.json ./React/
WORKDIR /app/React
RUN npm install

# Build the React React
COPY React/. .
RUN npm run build

COPY --from=build /app/backend /app/backend

# Copy the Express server
COPY server.js .

# Expose the ports for FastAPI and Express
EXPOSE 8000
EXPOSE 3000

# Start the backend and React
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port 8000 & node server.js"]
