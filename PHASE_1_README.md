# House Of Wear - Phase 1: Supabase Setup

## Overview
Phase 1 sets up the complete database schema, Row Level Security policies, functions/triggers, and seed data for the House Of Wear e-commerce platform.

---

## Files Created

### Configuration
- `.env.example` — Environment variables template

### Database Migrations (run in order)
- `supabase/migrations/001_initial_schema.sql` — All tables with indexes and constraints
- `supabase/migrations/002_rls_policies.sql` — Row Level Security policies
- `supabase/migrations/003_functions_triggers.sql` — Functions, triggers, and views
- `supabase/migrations/004_seed_data.sql` — 40 products with variants, images, coupons, pincodes

### Client-Side Code
- `src/types/database.ts` — Full TypeScript types for all tables
- `src/lib/supabase/client.ts` — Supabase browser client
- `src/lib/supabase/auth.ts` — Authentication helpers (Email OTP, Phone OTP, Google)
- `src/lib/supabase/auth-middleware.ts` — Auth state management and route guards
- `src/lib/supabase/storage.ts` — File upload helpers
- `src/vite-env.d.ts` — Vite environment type declarations

---

## Setup Instructions

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note your project URL and anon key from Settings → API

### 2. Configure Environment
```bash
cp .env.example .env.local
```
Fill in your Supabase URL and anon key.

### 3. Run Migrations
In the Supabase SQL Editor, run each migration file in order:
1. `001_initial_schema.sql`
2. `002_rls_policies.sql`
3. `003_functions_triggers.sql`
4. `004_seed_data.sql`

Or use the Supabase CLI:
```bash
npx supabase db push
```

### 4. Configure Auth Providers
In Supabase Dashboard → Authentication → Providers:
- **Email**: Enable, set confirmation to false (we use OTP)
- **Phone**: Enable with MSG91 or Twilio
- **Google**: Enable with your OAuth credentials

### 5. Create Storage Bucket
In Supabase Dashboard → Storage:
- Create bucket: `product-images`
- Set to public
- Add allowed MIME types: image/jpeg, image/png, image/webp, video/mp4

### 6. Create Admin User
After signup, update your profile role:
```sql
UPDATE profiles SET role = 'admin' WHERE email = 'your@email.com';
```

---

## Database Summary

### Tables (25 total)
| Table | Purpose |
|-------|---------|
| profiles | User profiles (extends auth.users) |
| addresses | Shipping addresses |
| sections | Men/Women/Kids/Shoes |
| categories | Nested product categories |
| collections | Curated product groups |
| products | Product catalog |
| product_variants | Size × color variants with stock |
| product_images | Product media |
| collection_products | Collection ↔ Product mapping |
| inventory_movements | Stock change audit trail |
| wishlists | User wishlists |
| carts / cart_items | Shopping cart |
| coupons | Discount codes |
| orders / order_items | Order management |
| returns / return_items | Return processing |
| reviews / review_images | Product reviews |
| back_in_stock_requests | Restock notifications |
| pincodes | Delivery serviceability |
| loyalty_transactions | Points ledger |
| gift_cards | Gift card management |
| store_locations | Physical stores |
| newsletter_subscribers | Email list |
| banners | Homepage CMS |

### Key Functions
- `is_admin()` — Check if current user is admin
- `place_order()` — Atomic order placement with stock validation
- `validate_coupon()` — Coupon validation with all rules
- `merge_guest_cart()` — Merge guest cart on login
- `get_best_coupon()` — Auto-suggest best coupon
- `check_pincode()` — Delivery serviceability check
- `generate_order_number()` — Order number generation

### Triggers
- Auto-create profile on user signup
- Auto-update `updated_at` timestamps
- Auto-generate search vectors for products
- Auto-calculate discount percentage
- Notify back-in-stock requests when stock restored

### Seed Data
- 4 sections (Men, Women, Kids, Shoes)
- 26+ categories
- 6 collections
- 40 products with variants
- 50+ product images
- 5 coupons
- 20 pincodes
- 3 store locations
- 6 banners

---

## Commands to Run

```bash
# Install dependencies (already done)
npm install

# Start dev server
npm run dev

# Type check
npm run typecheck
```

---

## What to Test

### Mobile (320–767px)
- [ ] `.env.example` file is readable and complete
- [ ] TypeScript types compile without errors
- [ ] Supabase client initializes (check console for warning if no credentials)

### Tablet (768–1199px)
- [ ] All migration SQL is valid (run in Supabase SQL Editor)
- [ ] RLS policies don't block public reads
- [ ] Seed data inserts correctly

### Desktop (1200px+)
- [ ] `place_order()` function works end-to-end
- [ ] `validate_coupon()` returns correct discounts
- [ ] `merge_guest_cart()` handles conflicts
- [ ] Profile auto-creates on signup
- [ ] Search vectors are generated for products
- [ ] Back-in-stock trigger fires correctly

---

## Security Notes
- ✅ RLS enabled on ALL tables
- ✅ Customers can only access their own data
- ✅ Public read access to products/categories/images
- ✅ Admin-only write access to catalog data
- ✅ `is_admin()` uses SECURITY DEFINER
- ✅ Service role key is server-only (never in client)
- ✅ All functions that modify data use SECURITY DEFINER

---

## Next Phase
Phase 2 will build the Next.js scaffold, Tailwind design system, responsive layout, and reusable components.

Say **"next"** to proceed to Phase 2.
