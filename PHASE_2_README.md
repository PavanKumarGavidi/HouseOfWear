# House Of Wear - Phase 2: Design System & Layout

## Overview
Phase 2 delivers the complete responsive design system, layout components, and reusable UI primitives for the House Of Wear e-commerce platform.

---

## Files Created

### Design System
- `src/index.css` — Tailwind v4 theme tokens, animations, utility classes, dark mode

### UI Components (`src/components/ui/`)
- `Button.tsx` — Primary/Secondary/Outline/Ghost/Danger variants, sizes xs-xl, loading state
- `ButtonLink` — Same as Button but renders as anchor
- `Input.tsx` — Text input with label, error, helper text, icons
- `Badge.tsx` — Default/Success/Warning/Error/Info/Sale variants
- `Skeleton.tsx` — Loading skeletons (rect, circle, text) + ProductCardSkeleton, HeaderSkeleton
- `Drawer.tsx` — Slide-in panel (left/right), backdrop, escape to close
- `BottomSheet.tsx` — Mobile bottom sheet with handle, auto/half/full height
- `ProductCard.tsx` — Product card with hover image, badges, wishlist, quick add
- `ProductGrid` — Responsive grid wrapper (2/3/4 columns)

### Layout Components (`src/components/layout/`)
- `Header.tsx` — Sticky header, hides on scroll down, shows on scroll up
- `MegaMenu.tsx` — Full navigation structure for Men/Women/Kids/Shoes
- `MobileDrawer.tsx` — Full-screen mobile menu with accordion categories
- `BottomTabBar.tsx` — Mobile bottom navigation (Home, Categories, Search, Wishlist, Account)
- `CartDrawer.tsx` — Slide-in cart with quantity controls
- `Footer.tsx` — Newsletter signup, link columns, copyright
- `Layout.tsx` — Main layout wrapper with dark mode toggle

### State Management (`src/stores/`)
- `index.ts` — Zustand stores:
  - `useCartStore` — Cart items, add/remove/update, coupon, computed totals
  - `useWishlistStore` — Wishlist toggle, persist to localStorage
  - `useUIStore` — Dark mode, mobile menu, cart drawer, search open

### Custom Hooks (`src/hooks/`)
- `index.ts` — 
  - `useMediaQuery` — Responsive breakpoint detection
  - `useIsMobile/Tablet/Desktop` — Convenience hooks
  - `useScrollDirection` — Hide/show header on scroll
  - `useDebounce` — Debounce values
  - `useLocalStorage` — Sync state with localStorage
  - `useClickOutside` — Close on outside click

### Utilities (`src/utils/`)
- `cn.ts` — className merge utility (twMerge, cn)

### Pages (`src/pages/`)
- `HomePage.tsx` — Hero, category tiles, bestsellers grid, editorial banner

### Router (`src/router/`)
- `index.tsx` — React Router config with all routes

---

## Design Tokens

### Typography
- **Body**: Inter (300-700 weights)
- **Headings**: Playfair Display (serif, italic accents)
- **Nav labels**: Uppercase, tracked, 11-12px

### Colors
- **Brand**: Monochrome scale (brand-50 to brand-950)
- **Accent**: Warm gold (accent-50 to accent-900)
- **Semantic**: Success (green), Warning (yellow), Error (red), Info (blue)

### Spacing
- **Page padding**: 1rem (mobile), 1.5rem (tablet), 2rem (desktop)
- **Grid gaps**: 1rem (mobile), 1.5rem (desktop)

### Breakpoints
- **Mobile**: 320-767px
- **Tablet**: 768-1199px
- **Desktop**: 1200px+

---

## Responsive Behavior

### Mobile (< 768px)
- ✅ Bottom tab bar visible
- ✅ Hamburger menu opens full-screen drawer
- ✅ 2-column product grid
- ✅ Bottom sheet for filters/size picker
- ✅ Sticky "Add to Bag" on product page (Phase 5)
- ✅ 44px minimum tap targets

### Tablet (768-1199px)
- ✅ 3-column product grid
- ✅ Drawer filters
- ✅ Collapsible side menu

### Desktop (1200px+)
- ✅ Hover mega-menu with promo tiles
- ✅ 4-column product grid
- ✅ Sticky sidebar filters (Phase 4)
- ✅ Side-by-side product gallery (Phase 5)

---

## Key Features

### Header
- Sticky with backdrop blur
- Hides on scroll down, shows on scroll up
- Cart badge with item count
- Wishlist badge with count
- Dark mode toggle
- Responsive: hamburger on mobile, mega-menu on desktop

### Mega Menu
- 4-column layout on desktop
- Organized by: New & Featured, Clothing, Work/Formal, Accessories
- Promo tile for sale
- Hover-activated, closes on mouse leave

### Mobile Drawer
- Full-screen overlay
- Accordion categories with subcategories
- Dark mode toggle in footer
- Smooth spring animation

### Cart Drawer
- Slide-in from right
- Quantity controls (+/-)
- Remove item button
- Subtotal calculation
- Links to full cart page and checkout

### Bottom Tab Bar
- 5 tabs: Home, Categories, Search, Wishlist, Account
- Active state indicator
- Badge for wishlist count
- Hidden on desktop

---

## Commands to Run

```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run typecheck  # Type checking
```

---

## What to Test

### Mobile (320-767px)
- [ ] Bottom tab bar visible and functional
- [ ] Hamburger menu opens full-screen drawer
- [ ] Accordion categories expand/collapse
- [ ] 2-column product grid on home page
- [ ] Cart drawer slides in from right
- [ ] 44px minimum tap targets
- [ ] Dark mode toggle works

### Tablet (768-1199px)
- [ ] 3-column product grid
- [ ] Header shows navigation links
- [ ] Cart drawer works
- [ ] No bottom tab bar

### Desktop (1200px+)
- [ ] 4-column product grid
- [ ] Mega menu appears on hover
- [ ] Header doesn't hide on scroll (or hides smoothly)
- [ ] Footer shows all link columns
- [ ] No bottom tab bar, no hamburger

---

## Build Status
✅ Build successful
- CSS: 33.11 kB (gzip: 6.80 kB)
- JS: 370.42 kB (gzip: 117.08 kB)

---

## Next Phase
Phase 3 will build the Home page with full hero carousel, brand tiles, lookbook grid, bestsellers carousel, Shop The Look, offers banner, and Instagram feed.

Say **"next"** to proceed to Phase 3.
