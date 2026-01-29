# 🚀 FRESH DEPLOYMENT GUIDE - PRAYAN MASALE

## 📋 STEP-BY-STEP PROCESS:

### STEP 1: Create New Vercel Project
1. **Go to**: https://vercel.com/dashboard
2. **Click**: "Add New Project" button
3. **Select**: "Import Git Repository"
4. **Choose**: GitHub as source
5. **Find**: "prayanoriginal" repository
6. **Click**: "Import"

### STEP 2: Project Configuration
```
Project Name: prayan-masale-v2
Framework Preset: React
Root Directory: prayanmasale (IMPORTANT!)
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### STEP 3: Environment Variables (CRITICAL!)
**Add these in Environment Variables section:**
```
VITE_RAZORPAY_KEY_ID=rzp_live_S9hhs3GBHcB4tt
VITE_RAZORPAY_KEY_SECRET=SnEX4je45NBX1zvVvqwqIuU1
NODE_ENV=production
VITE_APP_ENV=production
```

### STEP 4: Deploy
1. **Click**: "Deploy" button
2. **Wait**: 3-5 minutes for build
3. **Check**: Build logs for any errors
4. **Test**: Temporary URL (like prayan-masale-v2.vercel.app)

### STEP 5: Domain Transfer
1. **Go to**: New project → Settings → Domains
2. **Click**: "Add Domain"
3. **Type**: prayan.shop
4. **Click**: "Add"
5. **Confirm**: "Transfer from old project" → Yes
6. **Wait**: 2-3 minutes for DNS propagation

### STEP 6: Test Everything
1. **Visit**: https://prayan.shop
2. **Test**: Login with different users
3. **Check**: My Orders (should show only user's orders)
4. **Test**: Payment flow
5. **Verify**: Security fix working

## 🔧 IMPORTANT SETTINGS:

### Root Directory:
**MUST set to "prayanmasale"** because your code is in subfolder!

### Environment Variables:
**All 4 variables are required** for proper functioning.

### Build Settings:
- **Framework**: React
- **Build Command**: npm run build
- **Output Directory**: dist

## ✅ EXPECTED RESULTS:

After deployment:
- ✅ **Security fix active** (users see only their orders)
- ✅ **Razorpay live mode** working
- ✅ **Auto-deployment** enabled
- ✅ **Mobile responsive** design
- ✅ **All features** working
- ✅ **prayan.shop** domain active

## 🚨 TROUBLESHOOTING:

### If Build Fails:
- Check **Root Directory** is set to "prayanmasale"
- Verify **Environment Variables** are added
- Check **Build Command** is "npm run build"

### If Domain Not Working:
- Wait **5-10 minutes** for DNS propagation
- Clear browser cache
- Try incognito mode

### If Orders Still Show All Users:
- Check browser console for security logs
- Clear localStorage
- Hard refresh (Ctrl+Shift+R)

---
**READY FOR FRESH DEPLOYMENT! 🚀**

## NEXT STEPS:
1. Follow steps 1-6 above
2. Test thoroughly
3. Celebrate! 🎉