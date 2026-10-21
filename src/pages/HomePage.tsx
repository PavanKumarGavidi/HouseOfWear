import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ProductCard, ProductGrid } from '../components/ui/ProductCard';
import { Button, ButtonLink } from '../components/ui/Button';
import type { ProductWithDetails } from '../types/database';

// Mock product data for demo
const mockProducts: ProductWithDetails[] = [
  {
    id: '1',
    name: 'Oxford Classic White Shirt',
    slug: 'oxford-classic-white-shirt',
    base_price: 2499,
    mrp: 3499,
    discount_percent: 29,
    section_id: 'men',
    is_active: true,
    is_bestseller: true,
    is_new_arrival: false,
    tags: ['formal', 'classic'],
    gender: 'men',
    created_at: '',
    updated_at: '',
    primary_image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=533&fit=crop',
    hover_image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=533&fit=crop',
    available_colors: ['White', 'Blue'],
  },
  {
    id: '2',
    name: 'Midi Wrap Dress - Floral',
    slug: 'midi-wrap-dress-floral',
    base_price: 3499,
    mrp: 4999,
    discount_percent: 30,
    section_id: 'women',
    is_active: true,
    is_bestseller: true,
    is_new_arrival: false,
    tags: ['dress', 'floral'],
    gender: 'women',
    created_at: '',
    updated_at: '',
    primary_image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=533&fit=crop',
    hover_image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=533&fit=crop',
    available_colors: ['Floral'],
  },
  {
    id: '3',
    name: 'Minimal Leather Sneakers',
    slug: 'minimal-leather-sneakers',
    base_price: 4999,
    mrp: 6999,
    discount_percent: 29,
    section_id: 'shoes',
    is_active: true,
    is_bestseller: true,
    is_new_arrival: false,
    tags: ['sneakers', 'leather'],
    gender: 'men',
    created_at: '',
    updated_at: '',
    primary_image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=533&fit=crop',
    hover_image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=533&fit=crop',
    available_colors: ['White', 'Black'],
  },
  {
    id: '4',
    name: 'Dino Print Tee - Kids',
    slug: 'dino-print-tee-kids',
    base_price: 699,
    mrp: 999,
    discount_percent: 30,
    section_id: 'kids',
    is_active: true,
    is_bestseller: true,
    is_new_arrival: false,
    tags: ['kids', 'fun'],
    gender: 'kids',
    created_at: '',
    updated_at: '',
    primary_image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=533&fit=crop',
    available_colors: ['Green', 'Blue'],
  },
];

export function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center bg-brand-100 dark:bg-brand-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center text-white px-4"
        >
          <p className="text-xs uppercase tracking-[0.3em] mb-4">New Season</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
            The Autumn Edit
          </h1>
          <p className="text-base sm:text-lg mb-8 max-w-xl mx-auto opacity-90">
            Discover refined essentials for the modern wardrobe
          </p>
          <ButtonLink href="/collections/new-arrivals" size="lg">
            Shop New Arrivals
            <ArrowRight className="w-4 h-4 ml-2" />
          </ButtonLink>
        </motion.div>
      </section>

      {/* Category Tiles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Men', href: '/collections/men', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop' },
            { name: 'Women', href: '/collections/women', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=500&fit=crop' },
            { name: 'Kids', href: '/collections/kids', image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400&h=500&fit=crop' },
            { name: 'Shoes', href: '/collections/shoes', image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=500&fit=crop' },
          ].map((cat) => (
            <Link
              key={cat.name}
              to={cat.href}
              className="group relative aspect-[4/5] rounded overflow-hidden"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              <div className="absolute inset-0 flex items-end p-4 sm:p-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-medium text-white" style={{ fontFamily: 'var(--font-serif)' }}>
                    {cat.name}
                  </h3>
                  <p className="text-xs text-white/80 mt-1 uppercase tracking-wider">
                    Shop Now →
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-light" style={{ fontFamily: 'var(--font-serif)' }}>
            Bestsellers
          </h2>
          <Link
            to="/collections/bestsellers"
            className="text-xs uppercase tracking-wider font-medium hover:underline"
          >
            View All
          </Link>
        </div>
        
        <ProductGrid columns={4}>
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      </section>

      {/* Editorial Banner */}
      <section className="bg-brand-50 dark:bg-brand-900 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] mb-4 text-brand-600 dark:text-brand-400">
                The Edit
              </p>
              <h2 className="text-3xl sm:text-4xl font-light mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                Work Essentials
              </h2>
              <p className="text-sm text-brand-600 dark:text-brand-400 mb-6 max-w-md">
                Refined pieces for the modern professional. From tailored blazers to crisp shirts, 
                build your wardrobe with timeless staples.
              </p>
              <ButtonLink href="/collections/work-essentials" variant="outline">
                Explore Collection
              </ButtonLink>
            </div>
            <div className="aspect-[4/3] rounded overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop"
                alt="Work Essentials"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
