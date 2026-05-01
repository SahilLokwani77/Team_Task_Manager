@echo off
echo =========================================
echo GitHub Deployment Script for Team Task Manager
echo =========================================
echo.

set GITHUB_USERNAME=SahilLokwani77
set /p GITHUB_EMAIL="Enter your GitHub Email Address (for SahilLokwani77): "
set /p REPO_NAME="Enter your new GitHub repository name (e.g. team-task-manager): "

echo.
echo Clearing old GitHub credentials so you can log in as SahilLokwani77...
cmdkey /delete:LegacyGeneric:target=git:https://github.com >nul 2>&1

echo.
echo Setting new Git Profile locally...
git config --global user.name "%GITHUB_USERNAME%"
git config --global user.email "%GITHUB_EMAIL%"

echo.
echo Initializing Git...
git init

echo.
echo Adding files...
git add .

echo.
echo Committing files...
git commit -m "Initial commit for Team Task Manager"

echo.
echo Setting up branch...
git branch -M main

echo.
echo Pushing to GitHub...
git remote add origin https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git
git push -u origin main

echo.
echo =========================================
echo If you saw no errors, your code is on GitHub!
echo You can now go to Railway.app and deploy the repo.
echo =========================================
pause
