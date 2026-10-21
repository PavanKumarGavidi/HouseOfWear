import { Link } from 'react-router-dom';
import { HeroCarousel } from '../components/home/HeroCarousel';
import { CategoryCircles } from '../components/home/CategoryCircles';
import { ProductCarousel } from '../components/home/ProductCarousel';
import { LookbookGrid } from '../components/home/LookbookGrid';
import { ShopTheLook } from '../components/home/ShopTheLook';
import { InstagramFeed } from '../components/home/InstagramFeed';
import { ProductGrid, ProductCard } from '../components/ui/ProductCard';
import { Button } from '../components/ui/Button';
import type { ProductWithDetails } from '../types/database';

// Mock product data
const bestsellers: ProductWithDetails[] = [
  {
    id: '1', name: 'Oxford Classic White Shirt', slug: 'oxford-classic-white-shirt',
    base_price: 2499, mrp: 3499, discount_percent: 29, section_id: 'men',
    is_active: true, is_bestseller: true, is_new_arrival: false, tags: ['formal'],
    created_at: '', updated_at: '',
    primary_image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=533&fit=crop',
    hover_image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=533&fit=crop',
    available_colors: ['White', 'Blue'],
  },
  {
    id: '2', name: 'Midi Wrap Dress - Floral', slug: 'midi-wrap-dress-floral',
    base_price: 3499, mrp: 4999, discount_percent: 30, section_id: 'women',
    is_active: true, is_bestseller: true, is_new_arrival: false, tags: ['dress'],
    created_at: '', updated_at: '',
    primary_image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=533&fit=crop',
    hover_image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=533&fit=crop',
    available_colors: ['Floral'],
  },
  {
    id: '3', name: 'Minimal Leather Sneakers', slug: 'minimal-leather-sneakers',
    base_price: 4999, mrp: 6999, discount_percent: 29, section_id: 'shoes',
    is_active: true, is_bestseller: true, is_new_arrival: false, tags: ['sneakers'],
    created_at: '', updated_at: '',
    primary_image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=533&fit=crop',
    hover_image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=533&fit=crop',
    available_colors: ['White', 'Black'],
  },
  {
    id: '4', name: 'Dino Print Tee - Kids', slug: 'dino-print-tee-kids',
    base_price: 699, mrp: 999, discount_percent: 30, section_id: 'kids',
    is_active: true, is_bestseller: true, is_new_arrival: false, tags: ['kids'],
    created_at: '', updated_at: '',
    primary_image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=533&fit=crop',
    available_colors: ['Green', 'Blue'],
  },
  {
    id: '5', name: 'Tailored Chino Trousers', slug: 'tailored-chino-trousers',
    base_price: 2799, mrp: 3999, discount_percent: 30, section_id: 'men',
    is_active: true, is_bestseller: true, is_new_arrival: false, tags: ['formal'],
    created_at: '', updated_at: '',
    primary_image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=533&fit=crop',
    available_colors: ['Khaki', 'Navy'],
  },
  {
    id: '6', name: 'High Rise Skinny Jeans', slug: 'high-rise-skinny-jeans',
    base_price: 2799, mrp: 3999, discount_percent: 30, section_id: 'women',
    is_active: true, is_bestseller: true, is_new_arrival: false, tags: ['denim'],
    created_at: '', updated_at: '',
    primary_image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=533&fit=crop',
    hover_image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=533&fit=crop',
    available_colors: ['Dark Indigo', 'Black'],
  },
];

const newArrivals: ProductWithDetails[] = [
  {
    id: '7', name: 'Linen Camp Collar Shirt', slug: 'linen-camp-collar-shirt',
    base_price: 2199, mrp: 2999, discount_percent: 27, section_id: 'men',
    is_active: true, is_bestseller: false, is_new_arrival: true, tags: ['summer'],
    created_at: '', updated_at: '',
    primary_image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=533&fit=crop',
    available_colors: ['White', 'Blue'],
  },
  {
    id: '8', name: 'Graphic Print Oversized Tee', slug: 'graphic-print-oversized-tee',
    base_price: 1299, mrp: 1999, discount_percent: 35, section_id: 'men',
    is_active: true, is_bestseller: false, is_new_arrival: true, tags: ['streetwear'],
    created_at: '', updated_at: '',
    primary_image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=533&fit=crop',
    available_colors: ['Black', 'White'],
  },
  {
    id: '9', name: 'Slip Dress - Satin', slug: 'slip-dress-satin',
    base_price: 2999, mrp: 4499, discount_percent: 33, section_id: 'women',
    is_active: true, is_bestseller: false, is_new_arrival: true, tags: ['evening'],
    created_at: '', updated_at: '',
    primary_image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=533&fit=crop',
    available_colors: ['Black', 'Champagne'],
  },
  {
    id: '10', name: 'Heavyweight Hoodie', slug: 'heavyweight-hoodie',
    base_price: 2999, mrp: 3999, discount_percent: 25, section_id: 'men',
    is_active: true, is_bestseller: false, is_new_arrival: true, tags: ['comfort'],
    created_at: '', updated_at: '',
    primary_image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=533&fit=crop',
    available_colors: ['Grey', 'Black'],
  },
];

export function HomePage() {
  return (
    <div>
      <HeroCarousel />
      <CategoryCircles />

      {/* Brand Tiles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Men', href: '/collections/men', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop' },
            { name: 'Women', href: '/collections/women', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=500&fit=crop' },
            { name: 'Kids', href: '/collections/kids', image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400&h=500&fit=crop' },
            { name: 'Shoes', href: '/collections/shoes', image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=500&fit=crop' },
          ].map((cat) => (
            <Link key={cat.name} to={cat.href} className="group relative aspect-[4/5] rounded overflow-hidden">
              <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              <div className="absolute inset-0 flex items-end p-4 sm:p-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-medium text-white" style={{ fontFamily: 'var(--font-serif)' }}>{cat.name}</h3>
                  <p className="text-xs text-white/80 mt-1 uppercase tracking-wider">Shop Now →</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestsellers Carousel */}
      <ProductCarousel
        title="Bestsellers"
        subtitle="Our most loved pieces"
        products={bestsellers}
        viewAllHref="/collections/bestsellers"
      />

      <LookbookGrid />

      {/* New Arrivals Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-light" style={{ fontFamily: 'var(--font-serif)' }}>
              New In This Week
            </h2>
            <p className="text-sm text-brand-500 dark:text-brand-400 mt-1">Fresh drops every Monday</p>
          </div>
          <Link to="/collections/new-arrivals" className="text-xs uppercase tracking-wider font-medium hover:underline">
            View All
          </Link>
        </div>
        <ProductGrid columns={4}>
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      </section>

      <ShopTheLook />

      {/* Offers Banner */}
      <section className="bg-brand-950 dark:bg-white text-white dark:text-brand-950 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.3em] mb-3 opacity-70">Limited Time</p>
          <h2 className="text-3xl sm:text-4xl font-light mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
            Extra 14% Off on Prepaid Orders
          </h2>
          <p className="text-sm opacity-80 mb-6 max-w-md mx-auto">
            Use code <span className="font-mono font-bold">PREPAID14</span> on orders above ₹10,000
          </p>
          <Link to="/collections/new-arrivals">
            <Button size="lg" className="bg-white text-brand-950 hover:bg-brand-100 dark:bg-brand-950 dark:text-white dark:hover:bg-brand-800">
              Shop Now
            </Button>
          </Link>
        </div>
      </section>

      <InstagramFeed />
    </div>
  );
}
