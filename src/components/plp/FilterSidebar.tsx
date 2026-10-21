import { FilterSection } from './FilterSection';
import { ColorSwatches } from './ColorSwatches';
import { SizeCheckboxes } from './SizeCheckboxes';
import { PriceRangeSlider } from './PriceRangeSlider';
import type { ProductFilters } from '../../types/database';

interface FilterSidebarProps {
  filters: ProductFilters;
  onFilterChange: (updates: Partial<ProductFilters>) => void;
  onToggleArray: (key: 'sizes' | 'colors', value: string) => void;
}

const availableColors = [
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Black', hex: '#000000' },
  { name: 'Navy', hex: '#1B2838' },
  { name: 'Blue', hex: '#4A90D9' },
  { name: 'Red', hex: '#DC2626' },
  { name: 'Green', hex: '#16A34A' },
  { name: 'Khaki', hex: '#C3B091' },
  { name: 'Beige', hex: '#E8DCC4' },
  { name: 'Grey', hex: '#9CA3AF' },
  { name: 'Brown', hex: '#78350F' },
];

const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36', '8', '9', '10'];

const fitOptions = ['Regular', 'Slim', 'Relaxed', 'Oversized'];
const occasionOptions = ['Casual', 'Formal', 'Smart Casual', 'Party', 'Evening'];
const discountOptions = [
  { label: '10% or more', value: 10 },
  { label: '20% or more', value: 20 },
  { label: '30% or more', value: 30 },
  { label: '40% or more', value: 40 },
  { label: '50% or more', value: 50 },
];

export function FilterSidebar({ filters, onFilterChange, onToggleArray }: FilterSidebarProps) {
  return (
    <div className="space-y-6">
      <FilterSection title="Price Range">
        <PriceRangeSlider
          min={0}
          max={20000}
          valueMin={filters.price_min}
          valueMax={filters.price_max}
          onChange={(min, max) => onFilterChange({ price_min: min, price_max: max })}
        />
      </FilterSection>

      <FilterSection title="Size">
        <SizeCheckboxes
          sizes={availableSizes}
          selected={filters.sizes || []}
          onToggle={(size) => onToggleArray('sizes', size)}
        />
      </FilterSection>

      <FilterSection title="Color">
        <ColorSwatches
          colors={availableColors}
          selected={filters.colors || []}
          onToggle={(color) => onToggleArray('colors', color)}
        />
      </FilterSection>

      <FilterSection title="Fit">
        <div className="space-y-2">
          {fitOptions.map((fit) => (
            <label key={fit} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.fit === fit}
                onChange={() => onFilterChange({ fit: filters.fit === fit ? undefined : fit })}
                className="w-4 h-4 rounded border-brand-300 text-brand-900 focus:ring-brand-500"
              />
              <span className="text-sm text-brand-700 dark:text-brand-300">{fit}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Occasion">
        <div className="space-y-2">
          {occasionOptions.map((occasion) => (
            <label key={occasion} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.occasion === occasion}
                onChange={() => onFilterChange({ occasion: filters.occasion === occasion ? undefined : occasion })}
                className="w-4 h-4 rounded border-brand-300 text-brand-900 focus:ring-brand-500"
              />
              <span className="text-sm text-brand-700 dark:text-brand-300">{occasion}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Discount">
        <div className="space-y-2">
          {discountOptions.map((option) => (
            <label key={option.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="discount"
                checked={filters.discount === option.value}
                onChange={() => onFilterChange({ discount: filters.discount === option.value ? undefined : option.value })}
                className="w-4 h-4 border-brand-300 text-brand-900 focus:ring-brand-500"
              />
              <span className="text-sm text-brand-700 dark:text-brand-300">{option.label}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Availability">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.in_stock || false}
            onChange={() => onFilterChange({ in_stock: !filters.in_stock ? true : undefined })}
            className="w-4 h-4 rounded border-brand-300 text-brand-900 focus:ring-brand-500"
          />
          <span className="text-sm text-brand-700 dark:text-brand-300">In Stock Only</span>
        </label>
      </FilterSection>
    </div>
  );
}
