import { twMerge } from '../../utils/cn';

interface SizeSelectorProps {
  sizes: { value: string; inStock: boolean }[];
  selectedSize: string | null;
  onSelect: (size: string) => void;
  onSizeGuideOpen: () => void;
}

export function SizeSelector({ sizes, selectedSize, onSelect, onSizeGuideOpen }: SizeSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">
          Select Size
          {selectedSize && <span className="ml-2 text-brand-600 dark:text-brand-400 font-normal">({selectedSize})</span>}
        </label>
        <button
          onClick={onSizeGuideOpen}
          className="text-xs text-brand-600 dark:text-brand-400 hover:underline"
        >
          Size Guide
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {sizes.map((size) => {
          const isSelected = selectedSize === size.value;
          const isDisabled = !size.inStock;

          return (
            <button
              key={size.value}
              onClick={() => !isDisabled && onSelect(size.value)}
              disabled={isDisabled}
              className={twMerge(
                'relative px-3 py-3 text-sm border rounded transition-all',
                isSelected && 'border-brand-900 dark:border-white bg-brand-900 dark:bg-white text-white dark:text-brand-900 font-medium',
                !isSelected && !isDisabled && 'border-brand-200 dark:border-brand-700 hover:border-brand-400 dark:hover:border-brand-500',
                isDisabled && 'border-brand-100 dark:border-brand-800 text-brand-300 dark:text-brand-600 cursor-not-allowed'
              )}
              aria-label={`Size ${size.value}${isDisabled ? ' - Out of stock' : ''}`}
            >
              {size.value}
              {isDisabled && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-full h-px bg-brand-300 dark:bg-brand-600 rotate-[-20deg]" />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
