interface SizeCheckboxesProps {
  sizes: string[];
  selected: string[];
  onToggle: (size: string) => void;
}

export function SizeCheckboxes({ sizes, selected, onToggle }: SizeCheckboxesProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {sizes.map((size) => {
        const isSelected = selected.includes(size);
        return (
          <button
            key={size}
            onClick={() => onToggle(size)}
            className={`px-3 py-2 text-xs border rounded transition-all ${
              isSelected
                ? 'border-brand-900 dark:border-white bg-brand-900 dark:bg-white text-white dark:text-brand-900 font-medium'
                : 'border-brand-200 dark:border-brand-700 text-brand-700 dark:text-brand-300 hover:border-brand-400 dark:hover:border-brand-500'
            }`}
            aria-pressed={isSelected}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
}
