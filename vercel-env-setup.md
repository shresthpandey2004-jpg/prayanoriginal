# 🔧 VERCEL ENVIRONMENT VARIABLES SETUP

## 🚨 ISSUE IDENTIFIED:
Website still showing "Test Mode" because Vercel doesn't have live environment variables.

## ✅ SOLUTION - SET VERCEL ENV VARS:

### STEP 1: Go to Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Find your project: `prayanoriginal`
3. Click on project name

### STEP 2: Environment Variables
1. Go to **Settings** tab
2. Click **Environment Variables**
3. Add these variables:

```
Name: VITE_RAZORPAY_KEY_ID
Value: rzp_live_S9YzsBurtPax5w
Environment: Production, Preview, Development

Name: VITE_RAZORPAY_KEY_SECRET  
Value: S2WAy2q2N2xH1YQxDqCagjqk
Environment: Production, Preview, Development

Name: VITE_APP_ENV
Value: production
Environment: Production, Preview, Development
```

### STEP 3: Redeploy
1. Go to **Deployments** tab
2. Click **"Redeploy"** on latest deployment
3. Wait for deployment to complete

## 🎯 EXPECTED RESULT:
- Razorpay will show LIVE mode (no red "Test Mode" banner)
- Real payments will be processed
- Money will be charged to customers
- Settlements to your SBI account

## 🔍 VERIFICATION:
1. Visit https://prayan.shop/checkout
2. Try to make a payment
3. Check if "Test Mode" banner is gone
4. Verify live payment processing

---
**LIVE PAYMENTS WILL BE ACTIVE AFTER VERCEL ENV SETUP! 🚀**