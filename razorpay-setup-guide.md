# 🏦 RAZORPAY REAL PAYMENT SETUP GUIDE

## 🎯 CURRENT STATUS:
- ❌ Using test keys: `rzp_test_1DP5mmOlF5G5ag`
- ❌ No real payments possible
- ✅ Payment flow working in test mode

## 🚀 SETUP REAL RAZORPAY ACCOUNT:

### STEP 1: Create Razorpay Account
1. Go to https://razorpay.com
2. Click "Sign Up" 
3. Use business email (not personal)
4. Complete business verification

### STEP 2: Business Verification Documents
Required documents:
- **PAN Card** (Business/Individual)
- **Bank Account Details**
- **GST Certificate** (if applicable)
- **Business Address Proof**
- **Identity Proof** (Aadhaar/Passport)

### STEP 3: Get API Keys
After verification:
1. Go to Settings > API Keys
2. Generate Live Keys:
   - **Key ID**: `rzp_live_xxxxxxxxxx`
   - **Key Secret**: `xxxxxxxxxx` (keep secret!)

### STEP 4: Configure Webhooks (Optional)
1. Settings > Webhooks
2. Add webhook URL: `https://prayan.shop/api/razorpay/webhook`
3. Select events: payment.captured, payment.failed

## 💰 BUSINESS DETAILS FOR RAZORPAY:
```
Business Name: PRAYAN Masale
Business Type: E-commerce/Retail
Category: Food & Beverages
Website: https://prayan.shop
Business Address: 5PJ6+VGH Balaji Complex, Ruchi Township, Kavas, Limla, Gujarat 394510
```

## 🔧 INTEGRATION STEPS:
1. Get live API keys from Razorpay
2. Replace test keys in code
3. Test with small amount (₹1)
4. Go live!

## 📋 RAZORPAY FEES:
- **Domestic Cards**: 2% + GST
- **UPI**: 0.7% + GST  
- **Net Banking**: 0.9% + GST
- **Wallets**: 2% + GST

## ⚠️ IMPORTANT NOTES:
- Keep API Secret secure (never commit to Git)
- Use environment variables for production
- Test thoroughly before going live
- Setup proper error handling

---
**READY TO ACCEPT REAL PAYMENTS! 💳**