@echo off
echo 🚀 PRAYAN MASALE - MANUAL DEPLOYMENT SCRIPT
echo ==========================================

echo 📋 Step 1: Building project...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Build failed!
    pause
    exit /b 1
)

echo ✅ Build successful!

echo 📋 Step 2: Committing changes...
git add .
git commit -m "🚀 Manual deployment - %date% %time%"

echo 📋 Step 3: Pushing to GitHub...
git push origin main

echo 📋 Step 4: Deployment instructions...
echo.
echo 🎯 NOW GO TO VERCEL DASHBOARD:
echo 1. Open https://vercel.com/dashboard
echo 2. Select 'prayanoriginal' project
echo 3. Go to 'Deployments' tab
echo 4. Click 'Deploy' on latest commit
echo 5. Wait 2-3 minutes for deployment
echo.
echo ✅ Manual deployment process complete!
echo 🌐 Your website will be updated at: https://prayan.shop
echo.
pause