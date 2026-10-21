import { Drawer } from '../ui/Drawer';
import { Button } from '../ui/Button';
import { FilterSidebar } from './FilterSidebar';
import type { ProductFilters } from '../../types/database';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: ProductFilters;
  onFilterChange: (updates: Partial<ProductFilters>) => void;
  onToggleArray: (key: 'sizes' | 'colors', value: string) => void;
  onClearAll: () => void;
  activeFilterCount: number;
}

export function FilterDrawer({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onToggleArray,
  onClearAll,
  activeFilterCount,
}: FilterDrawerProps) {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      position="left"
      title={`Filters ${activeFilterCount > 0 ? `(${activeFilterCount})` : ''}`}
      className="max-w-sm"
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <FilterSidebar
            filters={filters}
            onFilterChange={onFilterChange}
            onToggleArray={onToggleArray}
          />
        </div>

        <div className="border-t border-brand-100 dark:border-brand-800 px-4 py-4 flex gap-3">
          <Button
            onClick={onClearAll}
            variant="outline"
            fullWidth
            disabled={activeFilterCount === 0}
          >
            Clear All
          </Button>
          <Button onClick={onClose} fullWidth>
            Show Results
          </Button>
        </div>
      </div>
    </Drawer>
  );
}
