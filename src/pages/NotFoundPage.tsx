import { Link } from 'react-router-dom';
import { Home, Search, ShoppingBag } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="text-9xl font-bold text-brand-100 dark:text-brand-900">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <ShoppingBag className="w-24 h-24 text-brand-400 dark:text-brand-600" />
            </div>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-3xl font-light mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
          Page Not Found
        </h1>
        <p className="text-brand-600 dark:text-brand-400 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-900 dark:bg-white text-white dark:text-brand-900 rounded hover:bg-brand-800 dark:hover:bg-brand-100 transition-colors"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <Link
            to="/collections"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-brand-200 dark:border-brand-700 text-brand-900 dark:text-white rounded hover:bg-brand-50 dark:hover:bg-brand-900 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            Shop Collection
          </Link>
          <Link
            to="/search"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-brand-200 dark:border-brand-700 text-brand-900 dark:text-white rounded hover:bg-brand-50 dark:hover:bg-brand-900 transition-colors"
          >
            <Search className="w-4 h-4" />
            Search
          </Link>
        </div>

        {/* Popular Links */}
        <div className="mt-12 pt-8 border-t border-brand-100 dark:border-brand-800">
          <p className="text-sm text-brand-600 dark:text-brand-400 mb-4">
            Popular Categories
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {['Men', 'Women', 'Kids', 'Shoes', 'New Arrivals', 'Sale'].map((category) => (
              <Link
                key={category}
                to={`/collections/${category.toLowerCase().replace(' ', '-')}`}
                className="px-4 py-2 text-sm border border-brand-200 dark:border-brand-700 rounded-full hover:bg-brand-50 dark:hover:bg-brand-900 transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
