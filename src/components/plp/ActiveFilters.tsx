import { X } from 'lucide-react';
import type { ProductFilters } from '../../types/database';

interface ActiveFiltersProps {
  filters: ProductFilters;
  onRemove: (key: keyof ProductFilters) => void;
  onClearAll: () => void;
}

export function ActiveFilters({ filters, onRemove, onClearAll }: ActiveFiltersProps) {
  const activeFilters: { key: keyof ProductFilters; label: string; value: string }[] = [];

  if (filters.sizes && filters.sizes.length > 0) {
    activeFilters.push({
      key: 'sizes',
      label: 'Size',
      value: filters.sizes.join(', '),
    });
  }

  if (filters.colors && filters.colors.length > 0) {
    activeFilters.push({
      key: 'colors',
      label: 'Color',
      value: filters.colors.join(', '),
    });
  }

  if (filters.price_min !== undefined || filters.price_max !== undefined) {
    const min = filters.price_min !== undefined ? `₹${filters.price_min}` : '₹0';
    const max = filters.price_max !== undefined ? `₹${filters.price_max}` : '∞';
    activeFilters.push({
      key: 'price_min',
      label: 'Price',
      value: `${min} - ${max}`,
    });
  }

  if (filters.fit) {
    activeFilters.push({
      key: 'fit',
      label: 'Fit',
      value: filters.fit,
    });
  }

  if (filters.occasion) {
    activeFilters.push({
      key: 'occasion',
      label: 'Occasion',
      value: filters.occasion,
    });
  }

  if (filters.discount) {
    activeFilters.push({
      key: 'discount',
      label: 'Discount',
      value: `${filters.discount}% or more`,
    });
  }

  if (filters.in_stock) {
    activeFilters.push({
      key: 'in_stock',
      label: 'Availability',
      value: 'In Stock',
    });
  }

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center flex-wrap gap-2 mb-4">
      <span className="text-sm text-brand-600 dark:text-brand-400">Active Filters:</span>
      {activeFilters.map((filter) => (
        <span
          key={filter.key}
          className="inline-flex items-center gap-1 px-3 py-1 bg-brand-100 dark:bg-brand-800 text-brand-900 dark:text-white text-xs rounded-full"
        >
          <span className="font-medium">{filter.label}:</span>
          <span>{filter.value}</span>
          <button
            onClick={() => onRemove(filter.key)}
            className="ml-1 hover:text-brand-600 dark:hover:text-brand-300 transition-colors"
            aria-label={`Remove ${filter.label} filter`}
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      <button
        onClick={onClearAll}
        className="text-xs text-brand-600 dark:text-brand-400 hover:text-brand-900 dark:hover:text-white underline transition-colors"
      >
        Clear All
      </button>
    </div>
  );
}
