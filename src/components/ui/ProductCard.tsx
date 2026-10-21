import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { twMerge } from '../../utils/cn';
import { Badge } from './Badge';
import type { ProductWithDetails } from '../../types/database';

interface ProductCardProps {
  product: ProductWithDetails;
  onWishlistToggle?: (productId: string) => void;
  isWishlisted?: boolean;
  className?: string;
  quickAdd?: boolean;
}

export function ProductCard({
  product,
  onWishlistToggle,
  isWishlisted = false,
  className,
  quickAdd = false,
}: ProductCardProps) {
  const {
    slug,
    name,
    base_price,
    mrp,
    discount_percent,
    primary_image,
    hover_image,
    is_bestseller,
    is_new_arrival,
    available_colors = [],
  } = product;

  const productUrl = `/products/${slug}`;
  const hasDiscount = discount_percent > 0;

  return (
    <div className={twMerge('group relative', className)}>
      {/* Image Container */}
      <Link to={productUrl} className="block relative aspect-[3/4] overflow-hidden rounded bg-brand-50 dark:bg-brand-900">
        {/* Primary Image */}
        <img
          src={primary_image || 'https://via.placeholder.com/400x533?text=Product'}
          alt={name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Hover Image */}
        {hover_image && (
          <img
            src={hover_image}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {is_new_arrival && (
            <Badge variant="default" size="sm">New</Badge>
          )}
          {is_bestseller && (
            <Badge variant="info" size="sm">Bestseller</Badge>
          )}
          {hasDiscount && (
            <Badge variant="sale" size="sm">{discount_percent}% OFF</Badge>
          )}
        </div>

        {/* Wishlist Button */}
        {onWishlistToggle && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onWishlistToggle(product.id);
            }}
            className={twMerge(
              'absolute top-2 right-2 p-2 rounded-full transition-all',
              'bg-white/80 dark:bg-brand-900/80 backdrop-blur-sm',
              'hover:bg-white dark:hover:bg-brand-900',
              'hover:scale-110 active:scale-95'
            )}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              className={twMerge(
                'w-4 h-4 transition-colors',
                isWishlisted ? 'fill-red-500 text-red-500' : 'text-brand-700 dark:text-brand-300'
              )}
            />
          </button>
        )}

        {/* Quick Add (visible on hover for desktop) */}
        {quickAdd && (
          <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
            <button className="w-full h-9 bg-brand-950 text-white text-xs uppercase tracking-wider font-medium rounded hover:bg-brand-800 transition-colors">
              Quick Add
            </button>
          </div>
        )}
      </Link>

      {/* Product Info */}
      <div className="mt-3 space-y-1">
        <Link to={productUrl} className="block">
          <h3 className="text-sm font-medium text-brand-900 dark:text-white line-clamp-2 group-hover:underline">
            {name}
          </h3>
        </Link>

        {/* Color Swatches */}
        {available_colors.length > 1 && (
          <div className="flex gap-1 pt-0.5">
            {available_colors.slice(0, 4).map((color, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full border border-brand-200 dark:border-brand-700"
                style={{ backgroundColor: color.toLowerCase() }}
                title={color}
              />
            ))}
            {available_colors.length > 4 && (
              <span className="text-[10px] text-brand-500 self-center">
                +{available_colors.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 pt-0.5">
          <span className="text-sm font-semibold text-brand-900 dark:text-white">
            ₹{base_price.toLocaleString('en-IN')}
          </span>
          {hasDiscount && (
            <>
              <span className="text-xs text-brand-500 line-through">
                ₹{mrp.toLocaleString('en-IN')}
              </span>
              <span className="text-xs font-medium text-success">
                ({discount_percent}% off)
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Grid wrapper for product cards
interface ProductGridProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
}

export function ProductGrid({ children, columns = 4, className }: ProductGridProps) {
  const colClasses = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  };

  return (
    <div className={twMerge('grid gap-4 sm:gap-6', colClasses[columns], className)}>
      {children}
    </div>
  );
}
