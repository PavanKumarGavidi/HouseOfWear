import { Link } from 'react-router-dom';

const categories = [
  { name: 'Shirts', href: '/collections/men-shirts', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=200&h=200&fit=crop' },
  { name: 'Dresses', href: '/collections/women-dresses', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=200&h=200&fit=crop' },
  { name: 'Sneakers', href: '/collections/shoes/mens-shoes', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop' },
  { name: 'Jeans', href: '/collections/men-jeans', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&h=200&fit=crop' },
  { name: 'T-Shirts', href: '/collections/men-t-shirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop' },
  { name: 'Jackets', href: '/collections/men-jackets', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&h=200&fit=crop' },
  { name: 'Tops', href: '/collections/women-tops', image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=200&h=200&fit=crop' },
  { name: 'Heels', href: '/collections/shoes/womens-shoes', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200&h=200&fit=crop' },
];

export function CategoryCircles() {
  return (
    <section className="py-10 sm:py-14 border-b border-brand-100 dark:border-brand-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-xs uppercase tracking-[0.3em] text-brand-500 dark:text-brand-400 mb-6">
          Shop by Category
        </h2>
        <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 snap-x snap-mandatory">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={cat.href}
              className="flex flex-col items-center gap-2 flex-shrink-0 snap-start group"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-transparent group-hover:border-brand-950 dark:group-hover:border-white transition-colors">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs font-medium text-brand-700 dark:text-brand-300 group-hover:text-brand-950 dark:group-hover:text-white transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
