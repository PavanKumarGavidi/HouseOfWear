import { twMerge } from '../../utils/cn';

interface ColorSelectorProps {
  colors: { name: string; hex: string; image?: string }[];
  selectedColor: string | null;
  onSelect: (color: string) => void;
}

export function ColorSelector({ colors, selectedColor, onSelect }: ColorSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">
        Color
        {selectedColor && <span className="ml-2 text-brand-600 dark:text-brand-400 font-normal">({selectedColor})</span>}
      </label>

      <div className="flex flex-wrap gap-3">
        {colors.map((color) => {
          const isSelected = selectedColor === color.name;

          return (
            <button
              key={color.name}
              onClick={() => onSelect(color.name)}
              className={twMerge(
                'relative w-10 h-10 rounded-full border-2 transition-all hover:scale-110',
                isSelected ? 'border-brand-900 dark:border-white scale-110' : 'border-brand-200 dark:border-brand-700'
              )}
              style={{ backgroundColor: color.hex }}
              title={color.name}
              aria-label={`Color: ${color.name}`}
              aria-pressed={isSelected}
            >
              {isSelected && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
