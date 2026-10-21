import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ProductGrid, ProductCard } from '../ui/ProductCard';
import type { ProductWithDetails } from '../../types/database';

interface BrandLandingProps {
  section: 'men' | 'women' | 'kids' | 'shoes';
  heroImage: string;
  heroTitle: string;
  heroSubtitle: string;
  categories: { name: string; href: string; image: string }[];
  featuredProducts: ProductWithDetails[];
  editorialImage: string;
  editorialTitle: string;
  editorialSubtitle: string;
}

export function BrandLanding({
  section,
  heroImage,
  heroTitle,
  heroSubtitle,
  categories,
  featuredProducts,
  editorialImage,
  editorialTitle,
  editorialSubtitle,
}: BrandLandingProps) {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] max-h-[600px] overflow-hidden">
        <img src={heroImage} alt={heroTitle} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 h-full flex items-center justify-center text-center text-white px-4"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] mb-3 opacity-80">{heroSubtitle}</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light" style={{ fontFamily: 'var(--font-serif)' }}>
              {heroTitle}
            </h1>
          </div>
        </motion.div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h2 className="text-center text-xs uppercase tracking-[0.3em] text-brand-500 dark:text-brand-400 mb-8">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link key={cat.name} to={cat.href} className="group relative aspect-[3/4] rounded overflow-hidden">
              <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              <div className="absolute inset-0 flex items-end p-4">
                <h3 className="text-base sm:text-lg font-medium text-white">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-t border-brand-100 dark:border-brand-800">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-light" style={{ fontFamily: 'var(--font-serif)' }}>
            Featured Pieces
          </h2>
          <Link to={`/collections/${section}`} className="text-xs uppercase tracking-wider font-medium hover:underline">
            View All
          </Link>
        </div>
        <ProductGrid columns={4}>
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      </section>

      {/* Editorial */}
      <section className="bg-brand-50 dark:bg-brand-900 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] mb-3 text-brand-600 dark:text-brand-400">The Edit</p>
              <h2 className="text-3xl sm:text-4xl font-light mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                {editorialTitle}
              </h2>
              <p className="text-sm text-brand-600 dark:text-brand-400 mb-6 max-w-md">{editorialSubtitle}</p>
              <Link to={`/collections/${section}/edit`}>
                <button className="h-11 px-6 border border-brand-950 dark:border-white text-brand-950 dark:text-white text-xs uppercase tracking-wider font-medium rounded hover:bg-brand-950 hover:text-white dark:hover:bg-white dark:hover:text-brand-950 transition-colors">
                  Explore
                </button>
              </Link>
            </div>
            <div className="aspect-[4/3] rounded overflow-hidden">
              <img src={editorialImage} alt={editorialTitle} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
