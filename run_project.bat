@echo off
echo Starting SkillForge AI E-Learning Platform...

:: Start Backend in a new window
echo Starting Backend on port 5000...
start cmd /k "cd backend && npm start"

:: Start Frontend in a new window
echo Starting Frontend on port 4200...
start cmd /k "cd frontend && npm start"

echo.
echo Both servers are starting in separate windows.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:4200
echo.
pause
