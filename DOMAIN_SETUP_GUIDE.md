# Custom Domain Setup Guide for Prayan Masale

## Current Issue
- Vercel dashboard mein sirf default domain dikh raha hai
- Custom domain `prayan-shop.shop` add nahi hai
- SEO mein hardcoded domain hai but actual domain different hai

## Step-by-Step Domain Setup

### 1. Vercel Dashboard mein Domain Add Karo

1. **Vercel Dashboard** pe jao
2. **prayanoriginal project** select karo
3. **Settings** tab pe click karo
4. **Domains** section mein jao
5. **Add Domain** button click karo
6. Type karo: `prayan-shop.shop`
7. **Add** button click karo

### 2. DNS Settings Update Karo

Domain provider (जहाँ से domain खरीदा है) mein jao:

#### A Records Add Karo:
```
Type: A
Name: @
Value: 76.76.19.61
TTL: 3600
```

```
Type: A  
Name: www
Value: 76.76.19.61
TTL: 3600
```

#### CNAME Record (Alternative):
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### 3. Subdomain Setup (Optional)

Agar `www.prayan-shop.shop` bhi chahiye:

```
Type: CNAME
Name: www
Value: prayan-shop.shop
TTL: 3600
```

### 4. Verification Process

1. DNS settings add karne ke baad **24-48 hours** wait karo
2. Vercel automatically verify kar dega
3. Green checkmark dikhega jab ready ho jayega

### 5. SSL Certificate

- Vercel automatically SSL certificate provide karega
- HTTPS automatically enable ho jayega
- No manual setup required

## Current Domains to Add:

1. **Primary:** `prayan-shop.shop`
2. **WWW:** `www.prayan-shop.shop` 
3. **Alternative:** `prayanmasale.com` (if you have this)

## After Domain Setup:

1. Update all SEO URLs from hardcoded to dynamic
2. Test all pages on new domain
3. Update Google Search Console
4. Update social media links
5. Update business cards/marketing materials

## Troubleshooting:

### Domain Not Working?
- Check DNS propagation: https://dnschecker.org
- Wait 24-48 hours for full propagation
- Clear browser cache
- Try incognito mode

### SSL Issues?
- Wait for Vercel to issue certificate (automatic)
- Check if domain is properly verified
- Contact Vercel support if needed

## Priority Actions:

1. **Add prayan-shop.shop to Vercel** (highest priority)
2. **Update DNS settings** at domain provider
3. **Wait for verification** (24-48 hours)
4. **Test website** on new domain
5. **Update SEO URLs** in code

## Contact Info:
- Domain Provider Support
- Vercel Support: vercel.com/support
- DNS Help: Contact domain registrar