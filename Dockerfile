# Stage 1: Build the React Frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install
COPY frontend/ ./frontend/
# Vite will build this into /app/backend/static because of vite.config.js
RUN cd frontend && npm run build

# Stage 2: Serve with Python FastAPI
FROM python:3.11-slim
WORKDIR /app

# Install Python dependencies
COPY backend/requirements.txt ./backend/
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy backend code
COPY backend/ ./backend/

# Copy the built React app from the frontend-build stage
COPY --from=frontend-build /app/backend/static/ ./backend/static/

# Run the FastAPI server
CMD cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT
