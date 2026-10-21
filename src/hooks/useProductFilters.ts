import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { ProductFilters, SectionName } from '../types/database';

const DEFAULT_PER_PAGE = 24;

export function useProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: ProductFilters = useMemo(() => ({
    section: (searchParams.get('section') as SectionName) || undefined,
    category: searchParams.get('category') || undefined,
    collection: searchParams.get('collection') || undefined,
    sizes: searchParams.get('sizes')?.split(',').filter(Boolean) || undefined,
    colors: searchParams.get('colors')?.split(',').filter(Boolean) || undefined,
    price_min: searchParams.get('price_min') ? Number(searchParams.get('price_min')) : undefined,
    price_max: searchParams.get('price_max') ? Number(searchParams.get('price_max')) : undefined,
    fit: searchParams.get('fit') || undefined,
    occasion: searchParams.get('occasion') || undefined,
    discount: searchParams.get('discount') ? Number(searchParams.get('discount')) : undefined,
    in_stock: searchParams.get('in_stock') === 'true' ? true : undefined,
    search: searchParams.get('q') || undefined,
    sort: (searchParams.get('sort') as ProductFilters['sort']) || 'newest',
    page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
    per_page: searchParams.get('per_page') ? Number(searchParams.get('per_page')) : DEFAULT_PER_PAGE,
  }), [searchParams]);

  const setFilters = useCallback((updates: Partial<ProductFilters>) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      // Handle each filter type
      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
          next.delete(key);
        } else if (Array.isArray(value)) {
          next.set(key, value.join(','));
        } else {
          next.set(key, String(value));
        }
      });

      // Reset page when filters change (unless page itself is being set)
      if (!('page' in updates)) {
        next.delete('page');
      }

      return next;
    }, { replace: false });
  }, [setSearchParams]);

  const clearFilters = useCallback(() => {
    setSearchParams({}, { replace: false });
  }, [setSearchParams]);

  const removeFilter = useCallback((key: keyof ProductFilters) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete(key);
      next.delete('page');
      return next;
    });
  }, [setSearchParams]);

  const toggleArrayFilter = useCallback((key: 'sizes' | 'colors', value: string) => {
    const current = filters[key] || [];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setFilters({ [key]: next.length > 0 ? next : undefined });
  }, [filters, setFilters]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.sizes?.length) count++;
    if (filters.colors?.length) count++;
    if (filters.price_min !== undefined || filters.price_max !== undefined) count++;
    if (filters.fit) count++;
    if (filters.occasion) count++;
    if (filters.discount) count++;
    if (filters.in_stock) count++;
    return count;
  }, [filters]);

  return {
    filters,
    setFilters,
    clearFilters,
    removeFilter,
    toggleArrayFilter,
    activeFilterCount,
  };
}
