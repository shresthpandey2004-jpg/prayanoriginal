@echo off
echo ========================================
echo  PRAYAN MASALE - MOBILE PAYMENT FIX
echo  Deploying to Production
echo ========================================
echo.

echo [1/4] Building project...
call npm run build
if errorlevel 1 (
    echo ERROR: Build failed!
    pause
    exit /b 1
)

echo.
echo [2/4] Build successful!
echo.

echo [3/4] Deploying to Vercel...
call vercel --prod
if errorlevel 1 (
    echo ERROR: Deployment failed!
    pause
    exit /b 1
)

echo.
echo [4/4] Deployment successful!
echo.
echo ========================================
echo  MOBILE PAYMENT FIX DEPLOYED! 
echo ========================================
echo.
echo Next steps:
echo 1. Test payment on mobile device
echo 2. Check browser console for logs
echo 3. Monitor Razorpay dashboard
echo.
pause
