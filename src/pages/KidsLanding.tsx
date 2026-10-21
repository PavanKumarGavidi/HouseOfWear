import { BrandLanding } from '../components/brand/BrandLanding';
import type { ProductWithDetails } from '../types/database';

const featuredProducts: ProductWithDetails[] = [
  {
    id: '20', name: 'Dino Print Tee - Kids', slug: 'dino-print-tee-kids',
    base_price: 699, mrp: 999, discount_percent: 30, section_id: 'kids',
    is_active: true, is_bestseller: true, is_new_arrival: false, tags: ['fun'],
    created_at: '', updated_at: '',
    primary_image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=533&fit=crop',
    available_colors: ['Green', 'Blue'],
  },
  {
    id: '21', name: 'Floral Party Dress', slug: 'floral-party-dress-kids',
    base_price: 1799, mrp: 2499, discount_percent: 28, section_id: 'kids',
    is_active: true, is_bestseller: false, is_new_arrival: true, tags: ['party'],
    created_at: '', updated_at: '',
    primary_image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&h=533&fit=crop',
    available_colors: ['Pink'],
  },
  {
    id: '22', name: 'Stretch Skinny Jeans - Kids', slug: 'stretch-skinny-jeans-kids',
    base_price: 1299, mrp: 1799, discount_percent: 28, section_id: 'kids',
    is_active: true, is_bestseller: true, is_new_arrival: false, tags: ['casual'],
    created_at: '', updated_at: '',
    primary_image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=533&fit=crop',
    available_colors: ['Blue'],
  },
  {
    id: '23', name: 'Puffer Vest - Kids', slug: 'puffer-vest-kids',
    base_price: 1499, mrp: 2199, discount_percent: 32, section_id: 'kids',
    is_active: true, is_bestseller: false, is_new_arrival: true, tags: ['outerwear'],
    created_at: '', updated_at: '',
    primary_image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=533&fit=crop',
    available_colors: ['Red', 'Blue'],
  },
];

export function KidsLanding() {
  return (
    <BrandLanding
      section="kids"
      heroImage="https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=1920&h=900&fit=crop"
      heroTitle="Kids"
      heroSubtitle="Playful styles for little trendsetters"
      categories={[
        { name: 'T-Shirts', href: '/collections/kids-t-shirts', image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=533&fit=crop' },
        { name: 'Dresses', href: '/collections/kids-dresses', image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&h=533&fit=crop' },
        { name: 'Jeans', href: '/collections/kids-jeans', image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=533&fit=crop' },
        { name: 'Jackets', href: '/collections/kids-jackets', image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=533&fit=crop' },
      ]}
      featuredProducts={featuredProducts}
      editorialImage="https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800&h=600&fit=crop"
      editorialTitle="Little Adventures"
      editorialSubtitle="Durable, comfortable, and stylish pieces designed for active kids. From playground to party."
    />
  );
}
