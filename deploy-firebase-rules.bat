@echo off
echo Deploying Firebase Firestore Security Rules...

REM Check if Firebase CLI is installed
firebase --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Firebase CLI not found. Installing...
    npm install -g firebase-tools
)

REM Deploy the rules
firebase deploy --only firestore:rules

echo Firebase rules deployed successfully!
pause
