import { ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import type { ProductFilters } from '../../types/database';

interface SortDropdownProps {
  value: ProductFilters['sort'];
  onChange: (sort: ProductFilters['sort']) => void;
}

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price_low', label: 'Price: Low to High' },
  { value: 'price_high', label: 'Price: High to Low' },
  { value: 'bestseller', label: 'Bestseller' },
  { value: 'discount', label: 'Discount' },
];

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLabel = sortOptions.find((opt) => opt.value === value)?.label || 'Sort';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 border border-brand-200 dark:border-brand-700 rounded hover:border-brand-400 dark:hover:border-brand-500 transition-colors"
      >
        <span className="text-sm">{selectedLabel}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-brand-900 border border-brand-200 dark:border-brand-700 rounded shadow-lg z-10">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value as ProductFilters['sort']);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-brand-50 dark:hover:bg-brand-800 transition-colors ${
                value === option.value ? 'font-medium text-brand-900 dark:text-white' : 'text-brand-700 dark:text-brand-300'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
