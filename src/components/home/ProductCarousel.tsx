import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../ui/ProductCard';
import type { ProductWithDetails } from '../../types/database';

interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  products: ProductWithDetails[];
  viewAllHref?: string;
}

export function ProductCarousel({ title, subtitle, products, viewAllHref }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.offsetWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-6 sm:mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-light" style={{ fontFamily: 'var(--font-serif)' }}>
              {title}
            </h2>
            {subtitle && (
              <p className="text-sm text-brand-500 dark:text-brand-400 mt-1">{subtitle}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {viewAllHref && (
              <Link
                to={viewAllHref}
                className="text-xs uppercase tracking-wider font-medium hover:underline mr-4 hidden sm:block"
              >
                View All
              </Link>
            )}
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-full border border-brand-200 dark:border-brand-700 hover:bg-brand-100 dark:hover:bg-brand-800 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-full border border-brand-200 dark:border-brand-700 hover:bg-brand-100 dark:hover:bg-brand-800 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory -mx-4 px-4 pb-4"
        >
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-[70vw] sm:w-[300px] lg:w-[280px] snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
