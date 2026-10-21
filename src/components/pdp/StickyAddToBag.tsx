import { ShoppingBag, Heart } from 'lucide-react';
import { Button } from '../ui/Button';
import { twMerge } from '../../utils/cn';

interface StickyAddToBagProps {
  price: number;
  originalPrice: number;
  discount: number;
  selectedSize: string | null;
  selectedColor: string | null;
  onAddToBag: () => void;
  onToggleWishlist: () => void;
  isWishlisted: boolean;
  isVisible: boolean;
}

export function StickyAddToBag({
  price,
  originalPrice,
  discount,
  selectedSize,
  selectedColor,
  onAddToBag,
  onToggleWishlist,
  isWishlisted,
  isVisible,
}: StickyAddToBagProps) {
  if (!isVisible) return null;

  const canAdd = selectedSize && selectedColor;

  return (
    <div className="fixed bottom-16 left-0 right-0 z-40 bg-white dark:bg-brand-950 border-t border-brand-200 dark:border-brand-700 p-4 lg:hidden">
      <div className="flex items-center gap-3">
        {/* Price Info */}
        <div className="flex-1">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold">₹{price.toLocaleString('en-IN')}</span>
            {discount > 0 && (
              <>
                <span className="text-sm text-brand-500 line-through">
                  ₹{originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs font-medium text-green-600 dark:text-green-400">
                  {discount}% off
                </span>
              </>
            )}
          </div>
          {!canAdd && (
            <p className="text-xs text-brand-500 dark:text-brand-400 mt-0.5">
              {!selectedSize ? 'Select size' : 'Select color'}
            </p>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={onToggleWishlist}
          className={twMerge(
            'p-3 rounded-full border transition-colors',
            isWishlisted
              ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-500'
              : 'border-brand-200 dark:border-brand-700 hover:border-brand-400 dark:hover:border-brand-500'
          )}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={twMerge('w-5 h-5', isWishlisted && 'fill-current')} />
        </button>

        {/* Add to Bag Button */}
        <Button
          onClick={onAddToBag}
          disabled={!canAdd}
          className="flex-1"
          leftIcon={<ShoppingBag className="w-4 h-4" />}
        >
          Add to Bag
        </Button>
      </div>
    </div>
  );
}
