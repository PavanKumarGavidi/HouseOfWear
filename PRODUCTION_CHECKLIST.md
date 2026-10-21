# House of Wear - Production Deployment Checklist

## ✅ Pre-Deployment Checklist

### 1. Environment Variables
- [ ] Set `VITE_SUPABASE_URL` in production
- [ ] Set `VITE_SUPABASE_ANON_KEY` in production
- [ ] Set `VITE_RAZORPAY_KEY_ID` in production
- [ ] Set `VITE_GA_MEASUREMENT_ID` for analytics
- [ ] Ensure all sensitive keys are NOT exposed to client

### 2. Database & Backend
- [ ] Run all Supabase migrations (001-004)
- [ ] Verify RLS policies are active
- [ ] Test authentication flows (Email OTP, Phone OTP, Google)
- [ ] Verify storage buckets are configured
- [ ] Test database functions (place_order, validate_coupon)
- [ ] Seed data is loaded (40+ products)

### 3. Payment Integration
- [ ] Razorpay keys configured
- [ ] Test payment flow in test mode
- [ ] Verify webhook endpoint is configured
- [ ] Test COD flow
- [ ] Verify order creation and stock deduction

### 4. Email & Notifications
- [ ] Resend API key configured
- [ ] Test order confirmation emails
- [ ] Test shipping notification emails
- [ ] Test back-in-stock notifications
- [ ] Verify email templates render correctly

### 5. SEO & Meta Tags
- [ ] `sitemap.xml` is accessible at `/sitemap.xml`
- [ ] `robots.txt` is accessible at `/robots.txt`
- [ ] Meta tags are dynamic per page
- [ ] Open Graph tags are set
- [ ] Twitter Card tags are set
- [ ] JSON-LD structured data is injected
- [ ] Canonical URLs are set

### 6. Performance
- [ ] Build size is optimized (< 500KB JS)
- [ ] Images are optimized (WebP/AVIF)
- [ ] Lazy loading is implemented
- [ ] Code splitting is working
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 2s
- [ ] Time to Interactive < 5s

### 7. Security
- [ ] HTTPS is enabled
- [ ] CORS is configured correctly
- [ ] Rate limiting is enabled on API
- [ ] Input validation is in place
- [ ] XSS protection is active
- [ ] CSRF protection is configured
- [ ] Service role key is NOT exposed

### 8. Testing
- [ ] All user flows tested (browse → cart → checkout)
- [ ] Admin dashboard tested
- [ ] Payment flow tested
- [ ] Order tracking tested
- [ ] Returns/exchange flow tested
- [ ] Wishlist functionality tested
- [ ] Search functionality tested
- [ ] Filter/sort functionality tested

### 9. Responsive Design
- [ ] Mobile (320px - 767px) tested
- [ ] Tablet (768px - 1199px) tested
- [ ] Desktop (1200px+) tested
- [ ] Touch interactions work on mobile
- [ ] Bottom tab bar works on mobile
- [ ] Mega menu works on desktop

### 10. Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## 🚀 Deployment Steps

### Step 1: Build Production Bundle
```bash
npm run build
```

### Step 2: Verify Build Output
```bash
ls -lh dist/
# Should contain:
# - index.html (1-2 KB)
# - assets/index-*.css (~54 KB)
# - assets/index-*.js (~562 KB)
```

### Step 3: Deploy to Hosting Platform

#### Option A: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Option B: Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

#### Option C: Manual Upload
Upload `dist/` folder to your hosting provider.

### Step 4: Configure Domain
- [ ] Point domain to hosting provider
- [ ] Enable HTTPS/SSL certificate
- [ ] Configure DNS records

### Step 5: Post-Deployment Verification
- [ ] Website loads without errors
- [ ] All pages are accessible
- [ ] Images load correctly
- [ ] Forms submit successfully
- [ ] Payment gateway works
- [ ] Emails are sent
- [ ] Analytics are tracking

---

## 📊 Monitoring & Analytics

### Google Analytics 4
- [ ] GA4 property is created
- [ ] Measurement ID is set in environment
- [ ] Events are being tracked:
  - [ ] page_view
  - [ ] view_item
  - [ ] add_to_cart
  - [ ] begin_checkout
  - [ ] purchase
  - [ ] search
  - [ ] login
  - [ ] sign_up

### Error Tracking
- [ ] Error boundaries are in place
- [ ] Console errors are logged
- [ ] Consider adding Sentry or similar

### Performance Monitoring
- [ ] Lighthouse audits are run regularly
- [ ] Core Web Vitals are monitored
- [ ] Consider adding SpeedCurve or similar

---

## 🔧 Maintenance Tasks

### Weekly
- [ ] Check error logs
- [ ] Review analytics
- [ ] Monitor performance metrics
- [ ] Check for failed payments

### Monthly
- [ ] Update dependencies
- [ ] Review and optimize images
- [ ] Clean up old orders/data
- [ ] Update product catalog
- [ ] Review SEO performance

### Quarterly
- [ ] Security audit
- [ ] Performance optimization
- [ ] UX improvements
- [ ] Feature updates
- [ ] Backup verification

---

## 🆘 Troubleshooting

### White Screen Issue
**Problem**: Website shows blank white screen
**Solution**: 
- Check browser console for errors
- Verify `main.tsx` is loading correctly
- Ensure `index.html` has correct script path
- Check if router is using `createHashRouter`

### Images Not Loading
**Problem**: Images show broken or don't load
**Solution**:
- Verify image URLs are correct
- Check Supabase storage bucket permissions
- Ensure CORS is configured
- Test image URLs directly in browser

### Payment Failures
**Problem**: Payments are failing
**Solution**:
- Verify Razorpay keys are correct
- Check webhook configuration
- Test in Razorpay test mode first
- Verify order creation in database

### Slow Performance
**Problem**: Website is slow
**Solution**:
- Run Lighthouse audit
- Optimize images (use WebP)
- Enable lazy loading
- Check bundle size
- Consider CDN for static assets

---

## 📞 Support Contacts

- **Supabase Support**: https://supabase.com/support
- **Razorpay Support**: https://razorpay.com/support
- **Resend Support**: https://resend.com/support
- **Vercel Support**: https://vercel.com/support

---

## ✅ Launch Checklist

Before going live:

- [ ] All tests pass
- [ ] Performance is optimized
- [ ] Security is verified
- [ ] SEO is configured
- [ ] Analytics are tracking
- [ ] Payment gateway is working
- [ ] Emails are sending
- [ ] Mobile responsiveness is verified
- [ ] Error handling is in place
- [ ] Documentation is complete
- [ ] Team is trained
- [ ] Support process is defined

---

## 🎉 Go Live!

Once all checks are complete:

1. Deploy to production
2. Monitor for first 24 hours
3. Collect user feedback
4. Iterate and improve

**Congratulations! Your House of Wear e-commerce platform is live!** 🚀
