# Team Task Manager

Full-stack application for managing projects and tracking tasks across teams.

## Tech Stack
- **Backend**: Python (FastAPI), SQLAlchemy, JWT Authentication
- **Frontend**: React (Vite), Custom Vanilla CSS (Glassmorphism design)
- **Database**: SQLite (local), PostgreSQL (production)

## Local Setup

### Backend
1. `cd backend`
2. `python -m venv venv`
3. `source venv/bin/activate` (or `venv\Scripts\activate` on Windows)
4. `pip install -r requirements.txt`
5. `uvicorn main:app --reload`
Backend will be available at `http://localhost:8000`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`
Frontend will be available at `http://localhost:5173`

## Deployment

This application is designed to be deployed on Railway.

1. Create a PostgreSQL database on Railway.
2. Deploy the backend service from the `/backend` folder. Set the `DATABASE_URL` environment variable to the PostgreSQL connection string. Set `SECRET_KEY` for JWT.
3. Deploy the frontend service from the `/frontend` folder. Set the `VITE_API_URL` environment variable to the backend's public URL.
