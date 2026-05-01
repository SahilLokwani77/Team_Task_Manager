@echo off
echo ==========================================
echo Starting Team Task Manager Locally
echo ==========================================
echo.

echo 1. Starting Backend Server...
start "Backend Server" cmd /k "cd backend && pip install -r requirements.txt && python -m uvicorn main:app --reload"

echo 2. Starting Frontend Server...
start "Frontend Server" cmd /k "cd frontend && npm install && npm run dev"

echo.
echo ==========================================
echo Both servers are starting up in separate windows!
echo Backend will be available at: http://localhost:8000
echo Frontend will be available at: http://localhost:5173
echo ==========================================
pause
