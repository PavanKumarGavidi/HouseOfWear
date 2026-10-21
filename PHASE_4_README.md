# Phase 4: Product Listing Page (PLP)

## Overview
Phase 4 delivers a complete Product Listing Page with advanced filtering, sorting, URL state management, and responsive filter UI.

## What Was Built

### Core Components

#### 1. ProductListingPage
- Main PLP component with breadcrumbs, filters, sorting, and product grid
- Responsive layout: sidebar on desktop, drawer on mobile
- Dynamic page title based on section/category
- Product count display
- Empty state with "Clear Filters" action

#### 2. FilterSidebar (Desktop)
- Sticky sidebar with all filter sections
- Collapsible filter groups
- "Clear All" button when filters active
- Scrollable on long filter lists

#### 3. FilterDrawer (Mobile)
- Slide-in drawer from left
- Same filters as desktop sidebar
- "Show Results" and "Clear All" buttons at bottom
- Active filter count badge

#### 4. Filter Components
- **FilterSection** — Collapsible wrapper with title and chevron
- **ColorSwatches** — Circular color swatches with selection state
- **SizeCheckboxes** — Grid of size buttons (XS-XXL, numeric sizes)
- **PriceRangeSlider** — Min/max inputs with Apply/Clear buttons
- **ActiveFilters** — Chip display of active filters with remove buttons

#### 5. SortDropdown
- Dropdown menu with sort options
- Click outside to close
- Shows current selection

#### 6. Breadcrumbs
- Navigation trail: Home > Section > Category
- Clickable links for parent levels
- Chevron separators

### Filter Types

#### Price Range
- Min/Max numeric inputs
- Range: ₹0 - ₹20,000
- Apply/Clear buttons
- Updates URL params

#### Size
- Grid layout (4 columns)
- Sizes: XS, S, M, L, XL, XXL, 28, 30, 32, 34, 36, 8, 9, 10
- Multi-select with toggle
- Selected state with filled background

#### Color
- Circular swatches (10 colors)
- Colors: White, Black, Navy, Blue, Red, Green, Khaki, Beige, Grey, Brown
- Multi-select with checkmark indicator
- Hover and selected states

#### Fit
- Checkboxes: Regular, Slim, Relaxed, Oversized
- Single select (radio behavior)

#### Occasion
- Checkboxes: Casual, Formal, Smart Casual, Party, Evening
- Single select (radio behavior)

#### Discount
- Radio buttons: 10%, 20%, 30%, 40%, 50% or more
- Single select

#### Availability
- Checkbox: In Stock Only
- Toggle on/off

### URL State Management

#### useProductFilters Hook
- Syncs all filters with URL search params
- Supports: section, category, sizes, colors, price_min, price_max, fit, occasion, discount, in_stock, sort, page
- Methods:
  - `setFilters(updates)` — Update multiple filters
  - `clearFilters()` — Remove all filters
  - `removeFilter(key)` — Remove specific filter
  - `toggleArrayFilter(key, value)` — Toggle size/color
- Computed: `activeFilterCount`
- Auto-resets page to 1 when filters change

#### URL Examples
```
/collections/men?sizes=S,M&colors=Black,Navy&price_min=1000&price_max=5000&sort=price_low
/collections/women/dresses?colors=Red&discount=30
/collections/shoes?in_stock=true&fit=Slim
```

### Sorting Options
1. **Newest** — Latest arrivals first
2. **Price: Low to High** — Ascending price
3. **Price: High to Low** — Descending price
4. **Bestseller** — Bestselling products first
5. **Discount** — Highest discount first

### Responsive Behavior

#### Mobile (< 768px)
- Filter button with badge showing active count
- Filter drawer slides from left
- 2-column product grid
- Sort dropdown in toolbar
- Full-width layout

#### Tablet (768-1199px)
- Filter button visible
- Filter drawer (same as mobile)
- 3-column product grid
- Sort dropdown in toolbar

#### Desktop (1200px+)
- Sticky sidebar on left (264px width)
- 4-column product grid
- Sort dropdown in toolbar
- No filter button needed

## File Structure

```
src/
├── components/
│   └── plp/
│       ├── Breadcrumbs.tsx
│       ├── SortDropdown.tsx
│       ├── ActiveFilters.tsx
│       ├── FilterSection.tsx
│       ├── ColorSwatches.tsx
│       ├── SizeCheckboxes.tsx
│       ├── PriceRangeSlider.tsx
│       ├── FilterSidebar.tsx
│       └── FilterDrawer.tsx
├── pages/
│   └── ProductListingPage.tsx
├── hooks/
│   └── useProductFilters.ts
└── router/
    └── index.tsx (updated)
```

## Routes Updated
- `/collections/:section` → ProductListingPage
- `/collections/:section/:category` → ProductListingPage

## Features

### Filtering
- ✅ Price range (min/max)
- ✅ Size (multi-select)
- ✅ Color (multi-select with swatches)
- ✅ Fit (single select)
- ✅ Occasion (single select)
- ✅ Discount threshold (single select)
- ✅ In-stock only (toggle)
- ✅ Active filter chips with remove
- ✅ Clear all filters

### Sorting
- ✅ Newest
- ✅ Price low to high
- ✅ Price high to low
- ✅ Bestseller
- ✅ Discount

### UI/UX
- ✅ Breadcrumb navigation
- ✅ Product count display
- ✅ Empty state with CTA
- ✅ Sticky desktop sidebar
- ✅ Mobile filter drawer
- ✅ Active filter count badge
- ✅ Smooth transitions
- ✅ Accessible (ARIA labels, keyboard nav)

### State Management
- ✅ URL-synced filters
- ✅ Shareable URLs
- ✅ Browser back/forward support
- ✅ Auto page reset on filter change

## Technical Implementation

### State Management
- `useProductFilters` hook manages all filter state
- URL search params as single source of truth
- `useMemo` for filtered/sorted products
- `useCallback` for filter handlers

### Performance
- Memoized product filtering and sorting
- Lazy loading for filter components
- Efficient re-renders with proper dependencies
- Optimized bundle size (422KB JS, 43KB CSS)

### Accessibility
- ARIA labels on all interactive elements
- Keyboard navigation support
- Focus states on buttons and inputs
- Screen reader friendly structure

## Testing Checklist

### Filtering
- [ ] Price range filters work (min/max)
- [ ] Size filter toggles correctly
- [ ] Color swatches select/deselect
- [ ] Fit, Occasion, Discount work as radio buttons
- [ ] In-stock toggle works
- [ ] Active filters display correctly
- [ ] Remove individual filters works
- [ ] Clear all filters works

### Sorting
- [ ] All 5 sort options work
- [ ] Dropdown opens/closes correctly
- [ ] Click outside closes dropdown
- [ ] Current selection displays

### Responsive
- [ ] Mobile: Filter drawer opens/closes
- [ ] Mobile: 2-column grid displays
- [ ] Tablet: 3-column grid displays
- [ ] Desktop: Sidebar is sticky
- [ ] Desktop: 4-column grid displays

### URL State
- [ ] Filters update URL params
- [ ] URL params load correct filters
- [ ] Browser back/forward works
- [ ] Page resets to 1 on filter change
- [ ] URLs are shareable

### Edge Cases
- [ ] No products shows empty state
- [ ] Clear filters from empty state works
- [ ] Multiple filters combine correctly
- [ ] Filter count badge updates

## Build Status
✅ Build successful
- HTML: 3.66 KB
- CSS: 43.62 KB (gzip: 8.22 KB)
- JS: 422.11 KB (gzip: 127.19 KB)
- Build time: 6.67s

## Files Created: 11 files
- 9 PLP components
- 1 custom hook
- 1 page component
- Updated router

## Next Steps
Phase 5 will implement the Product Detail Page (PDP) with:
- Image gallery with zoom and thumbnails
- Product information (name, price, description)
- Size selector with stock status
- Color selector
- Add to cart / wishlist buttons
- Product tabs (description, details, shipping, reviews)
- Related products section
- Breadcrumb navigation
