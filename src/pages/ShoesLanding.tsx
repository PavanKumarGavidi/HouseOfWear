import { BrandLanding } from '../components/brand/BrandLanding';
import type { ProductWithDetails } from '../types/database';

const featuredProducts: ProductWithDetails[] = [
  {
    id: '30', name: 'Minimal Leather Sneakers', slug: 'minimal-leather-sneakers',
    base_price: 4999, mrp: 6999, discount_percent: 29, section_id: 'shoes',
    is_active: true, is_bestseller: true, is_new_arrival: false, tags: ['sneakers'],
    created_at: '', updated_at: '',
    primary_image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=533&fit=crop',
    hover_image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=533&fit=crop',
    available_colors: ['White', 'Black'],
  },
  {
    id: '31', name: 'Block Heel Mules', slug: 'block-heel-mules',
    base_price: 3499, mrp: 4999, discount_percent: 30, section_id: 'shoes',
    is_active: true, is_bestseller: true, is_new_arrival: false, tags: ['heels'],
    created_at: '', updated_at: '',
    primary_image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=533&fit=crop',
    available_colors: ['Black', 'Nude'],
  },
  {
    id: '32', name: 'Suede Chelsea Boots', slug: 'suede-chelsea-boots',
    base_price: 5999, mrp: 8499, discount_percent: 29, section_id: 'shoes',
    is_active: true, is_bestseller: false, is_new_arrival: true, tags: ['boots'],
    created_at: '', updated_at: '',
    primary_image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=400&h=533&fit=crop',
    available_colors: ['Brown', 'Black'],
  },
  {
    id: '33', name: 'Ballet Flats - Nude', slug: 'ballet-flats-nude',
    base_price: 2499, mrp: 3499, discount_percent: 29, section_id: 'shoes',
    is_active: true, is_bestseller: true, is_new_arrival: false, tags: ['flats'],
    created_at: '', updated_at: '',
    primary_image: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=400&h=533&fit=crop',
    available_colors: ['Nude', 'Black'],
  },
];

export function ShoesLanding() {
  return (
    <BrandLanding
      section="shoes"
      heroImage="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1920&h=900&fit=crop"
      heroTitle="Shoes"
      heroSubtitle="Step out in style"
      categories={[
        { name: "Men's Sneakers", href: '/collections/shoes/mens-shoes', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=533&fit=crop' },
        { name: "Men's Formals", href: '/collections/shoes/mens-shoes', image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400&h=533&fit=crop' },
        { name: "Women's Heels", href: '/collections/shoes/womens-shoes', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=533&fit=crop' },
        { name: "Women's Flats", href: '/collections/shoes/womens-shoes', image: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=400&h=533&fit=crop' },
        { name: 'Boots', href: '/collections/shoes/mens-shoes', image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=400&h=533&fit=crop' },
        { name: 'Sandals', href: '/collections/shoes/womens-shoes', image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&h=533&fit=crop' },
      ]}
      featuredProducts={featuredProducts}
      editorialImage="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=600&fit=crop"
      editorialTitle="Crafted for Every Step"
      editorialSubtitle="From hand-finished formals to minimal sneakers, discover footwear that combines comfort with timeless style."
    />
  );
}
