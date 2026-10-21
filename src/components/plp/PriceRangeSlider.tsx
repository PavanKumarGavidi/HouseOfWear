import { useState, useEffect } from 'react';

interface PriceRangeSliderProps {
  min: number;
  max: number;
  valueMin: number | undefined;
  valueMax: number | undefined;
  onChange: (min: number | undefined, max: number | undefined) => void;
}

export function PriceRangeSlider({ min, max, valueMin, valueMax, onChange }: PriceRangeSliderProps) {
  const [localMin, setLocalMin] = useState(valueMin || min);
  const [localMax, setLocalMax] = useState(valueMax || max);

  useEffect(() => {
    setLocalMin(valueMin || min);
    setLocalMax(valueMax || max);
  }, [valueMin, valueMax, min, max]);

  const handleApply = () => {
    onChange(
      localMin > min ? localMin : undefined,
      localMax < max ? localMax : undefined
    );
  };

  const handleClear = () => {
    setLocalMin(min);
    setLocalMax(max);
    onChange(undefined, undefined);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <label className="text-xs text-brand-600 dark:text-brand-400 mb-1 block">Min</label>
          <input
            type="number"
            value={localMin}
            onChange={(e) => setLocalMin(Number(e.target.value))}
            className="w-full px-2 py-1.5 border border-brand-200 dark:border-brand-700 rounded text-sm bg-white dark:bg-brand-900"
            min={min}
            max={localMax}
          />
        </div>
        <span className="text-brand-400 mt-5">—</span>
        <div className="flex-1">
          <label className="text-xs text-brand-600 dark:text-brand-400 mb-1 block">Max</label>
          <input
            type="number"
            value={localMax}
            onChange={(e) => setLocalMax(Number(e.target.value))}
            className="w-full px-2 py-1.5 border border-brand-200 dark:border-brand-700 rounded text-sm bg-white dark:bg-brand-900"
            min={localMin}
            max={max}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleApply}
          className="flex-1 px-3 py-1.5 bg-brand-900 dark:bg-white text-white dark:text-brand-900 text-xs font-medium rounded hover:bg-brand-800 dark:hover:bg-brand-100 transition-colors"
        >
          Apply
        </button>
        <button
          onClick={handleClear}
          className="flex-1 px-3 py-1.5 border border-brand-200 dark:border-brand-700 text-brand-700 dark:text-brand-300 text-xs font-medium rounded hover:bg-brand-50 dark:hover:bg-brand-800 transition-colors"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
