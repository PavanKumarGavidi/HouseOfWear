import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import { Breadcrumbs } from '../components/plp/Breadcrumbs';
import { SortDropdown } from '../components/plp/SortDropdown';
import { ActiveFilters } from '../components/plp/ActiveFilters';
import { FilterSidebar } from '../components/plp/FilterSidebar';
import { FilterDrawer } from '../components/plp/FilterDrawer';
import { ProductGrid, ProductCard } from '../components/ui/ProductCard';
import { useProductFilters } from '../hooks/useProductFilters';
import { useIsMobile } from '../hooks';
import type { ProductWithDetails } from '../types/database';

// Mock products for demo
const mockProducts: ProductWithDetails[] = [
  {
    id: '1', name: 'Oxford Classic White Shirt', slug: 'oxford-classic-white-shirt',
    base_price: 2499, mrp: 3499, discount_percent: 29, section_id: 'men',
    is_active: true, is_bestseller: true, is_new_arrival: false, tags: ['formal'],
    created_at: '', updated_at: '',
    primary_image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=533&fit=crop',
    hover_image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=533&fit=crop',
    available_colors: ['White', 'Blue'],
  },
  {
    id: '2', name: 'Tailored Chino Trousers', slug: 'tailored-chino-trousers',
    base_price: 2799, mrp: 3999, discount_percent: 30, section_id: 'men',
    is_active: true, is_bestseller: true, is_new_arrival: false, tags: ['formal'],
    created_at: '', updated_at: '',
    primary_image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=533&fit=crop',
    available_colors: ['Khaki', 'Navy'],
  },
  {
    id: '3', name: 'Bomber Jacket - Navy', slug: 'bomber-jacket-navy',
    base_price: 4999, mrp: 6999, discount_percent: 29, section_id: 'men',
    is_active: true, is_bestseller: true, is_new_arrival: false, tags: ['outerwear'],
    created_at: '', updated_at: '',
    primary_image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=533&fit=crop',
    hover_image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=533&fit=crop',
    available_colors: ['Navy'],
  },
  {
    id: '4', name: 'Essential Crew Neck Tee', slug: 'essential-crew-neck-tee',
    base_price: 999, mrp: 1499, discount_percent: 33, section_id: 'men',
    is_active: true, is_bestseller: true, is_new_arrival: false, tags: ['essential'],
    created_at: '', updated_at: '',
    primary_image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=533&fit=crop',
    available_colors: ['Black', 'White', 'Navy'],
  },
  {
    id: '5', name: 'Linen Camp Collar Shirt', slug: 'linen-camp-collar-shirt',
    base_price: 2199, mrp: 2999, discount_percent: 27, section_id: 'men',
    is_active: true, is_bestseller: false, is_new_arrival: true, tags: ['summer'],
    created_at: '', updated_at: '',
    primary_image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=533&fit=crop',
    available_colors: ['White', 'Blue'],
  },
  {
    id: '6', name: 'Graphic Print Oversized Tee', slug: 'graphic-print-oversized-tee',
    base_price: 1299, mrp: 1999, discount_percent: 35, section_id: 'men',
    is_active: true, is_bestseller: false, is_new_arrival: true, tags: ['streetwear'],
    created_at: '', updated_at: '',
    primary_image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=533&fit=crop',
    available_colors: ['Black', 'White'],
  },
  {
    id: '7', name: 'Selvedge Slim Jeans', slug: 'selvedge-slim-jjeans',
    base_price: 3999, mrp: 5499, discount_percent: 27, section_id: 'men',
    is_active: true, is_bestseller: false, is_new_arrival: true, tags: ['denim'],
    created_at: '', updated_at: '',
    primary_image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=533&fit=crop',
    available_colors: ['Indigo'],
  },
  {
    id: '8', name: 'Heavyweight Hoodie', slug: 'heavyweight-hoodie',
    base_price: 2999, mrp: 3999, discount_percent: 25, section_id: 'men',
    is_active: true, is_bestseller: false, is_new_arrival: true, tags: ['comfort'],
    created_at: '', updated_at: '',
    primary_image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=533&fit=crop',
    available_colors: ['Grey', 'Black'],
  },
];

export function ProductListingPage() {
  const { section, category } = useParams<{ section?: string; category?: string }>();
  const isMobile = useIsMobile();
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const {
    filters,
    setFilters,
    clearFilters,
    removeFilter,
    toggleArrayFilter,
    activeFilterCount,
  } = useProductFilters();

  // Filter and sort products (in real app, this would be server-side)
  const filteredProducts = useMemo(() => {
    let result = [...mockProducts];

    // Apply filters
    if (filters.price_min !== undefined) {
      result = result.filter((p) => p.base_price >= filters.price_min!);
    }
    if (filters.price_max !== undefined) {
      result = result.filter((p) => p.base_price <= filters.price_max!);
    }
    if (filters.discount !== undefined) {
      result = result.filter((p) => p.discount_percent >= filters.discount!);
    }
    if (filters.in_stock) {
      // In real app, check actual stock
      result = result.filter((p) => p.is_active);
    }

    // Apply sorting
    switch (filters.sort) {
      case 'price_low':
        result.sort((a, b) => a.base_price - b.base_price);
        break;
      case 'price_high':
        result.sort((a, b) => b.base_price - a.base_price);
        break;
      case 'bestseller':
        result.sort((a, b) => (b.is_bestseller ? 1 : 0) - (a.is_bestseller ? 1 : 0));
        break;
      case 'discount':
        result.sort((a, b) => b.discount_percent - a.discount_percent);
        break;
      case 'newest':
      default:
        result.sort((a, b) => (b.is_new_arrival ? 1 : 0) - (a.is_new_arrival ? 1 : 0));
        break;
    }

    return result;
  }, [filters]);

  // Build breadcrumbs
  const breadcrumbs = [];
  if (section) {
    breadcrumbs.push({ label: section.charAt(0).toUpperCase() + section.slice(1), href: `/collections/${section}` });
  }
  if (category) {
    breadcrumbs.push({ label: category.charAt(0).toUpperCase() + category.slice(1) });
  }

  const pageTitle = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : section
    ? section.charAt(0).toUpperCase() + section.slice(1)
    : 'All Products';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <Breadcrumbs items={breadcrumbs} />

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-light" style={{ fontFamily: 'var(--font-serif)' }}>
          {pageTitle}
        </h1>
        <span className="text-sm text-brand-500 dark:text-brand-400">
          {filteredProducts.length} products
        </span>
      </div>

      {/* Active Filters */}
      <ActiveFilters filters={filters} onRemove={removeFilter} onClearAll={clearFilters} />

      <div className="flex gap-6 lg:gap-8">
        {/* Desktop Sidebar */}
        {!isMobile && (
          <aside className="w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-medium uppercase tracking-wider">Filters</h2>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-brand-600 dark:text-brand-400 hover:underline"
                  >
                    Clear All
                  </button>
                )}
              </div>
              <FilterSidebar
                filters={filters}
                onFilterChange={setFilters}
                onToggleArray={toggleArrayFilter}
              />
            </div>
          </aside>
        )}

        {/* Main Content */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-brand-100 dark:border-brand-800">
            {isMobile && (
              <button
                onClick={() => setFilterDrawerOpen(true)}
                className="flex items-center gap-2 px-4 py-2 border border-brand-200 dark:border-brand-700 rounded hover:border-brand-400 dark:hover:border-brand-500 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="text-sm">Filters</span>
                {activeFilterCount > 0 && (
                  <span className="w-5 h-5 bg-brand-900 dark:bg-white text-white dark:text-brand-900 text-xs rounded-full flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            )}
            <div className={isMobile ? 'ml-auto' : ''}>
              <SortDropdown value={filters.sort} onChange={(sort) => setFilters({ sort })} />
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <ProductGrid columns={4}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ProductGrid>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-brand-500 dark:text-brand-400 mb-2">No products found</p>
              <p className="text-sm text-brand-400 dark:text-brand-500">Try adjusting your filters</p>
              <button
                onClick={clearFilters}
                className="mt-4 px-6 py-2 bg-brand-900 dark:bg-white text-white dark:text-brand-900 text-sm font-medium rounded hover:bg-brand-800 dark:hover:bg-brand-100 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <FilterDrawer
        isOpen={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        filters={filters}
        onFilterChange={setFilters}
        onToggleArray={toggleArrayFilter}
        onClearAll={clearFilters}
        activeFilterCount={activeFilterCount}
      />
    </div>
  );
}
