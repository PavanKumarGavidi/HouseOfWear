interface ColorSwatchesProps {
  colors: { name: string; hex: string }[];
  selected: string[];
  onToggle: (color: string) => void;
}

const colorMap: Record<string, string> = {
  'White': '#FFFFFF',
  'Black': '#000000',
  'Navy': '#1B2838',
  'Blue': '#4A90D9',
  'Red': '#DC2626',
  'Green': '#16A34A',
  'Khaki': '#C3B091',
  'Beige': '#E8DCC4',
  'Grey': '#9CA3AF',
  'Brown': '#78350F',
  'Pink': '#EC4899',
  'Yellow': '#EAB308',
  'Orange': '#F97316',
  'Purple': '#9333EA',
  'Floral': '#E8B4B8',
  'Dark Indigo': '#1A1A4E',
  'Ivory': '#FFFFF0',
  'Champagne': '#F7E7CE',
  'Nude': '#E8C4A0',
};

export function ColorSwatches({ colors, selected, onToggle }: ColorSwatchesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {colors.map((color) => {
        const isSelected = selected.includes(color.name);
        const hex = colorMap[color.name] || color.hex || '#CCCCCC';

        return (
          <button
            key={color.name}
            onClick={() => onToggle(color.name)}
            className={`relative w-8 h-8 rounded-full border-2 transition-all ${
              isSelected
                ? 'border-brand-900 dark:border-white scale-110'
                : 'border-brand-200 dark:border-brand-700 hover:border-brand-400 dark:hover:border-brand-500'
            }`}
            style={{ backgroundColor: hex }}
            title={color.name}
            aria-label={`Filter by ${color.name}`}
            aria-pressed={isSelected}
          >
            {isSelected && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full shadow-sm" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
