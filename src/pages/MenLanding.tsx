import { BrandLanding } from '../components/brand/BrandLanding';
import type { ProductWithDetails } from '../types/database';

const featuredProducts: ProductWithDetails[] = [
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
    id: '2', name: 'Tailored Chino Trousers', slug: 'tailored-chino-trousers',
    base_price: 2799, mrp: 3999, discount_percent: 30, section_id: 'men',
    is_active: true, is_bestseller: true, is_new_arrival: false, tags: ['formal'],
    created_at: '', updated_at: '',
    primary_image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=533&fit=crop',
    available_colors: ['Khaki', 'Navy'],
  },
  {
    id: '3', name: 'Bomber Jacket - Navy', slug: 'bomber-jacket-navy',
    base_price: 4999, mrp: 6999, discount_percent: 29, section_id: 'men',
    is_active: true, is_bestseller: true, is_new_arrival: false, tags: ['outerwear'],
    created_at: '', updated_at: '',
    primary_image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=533&fit=crop',
    hover_image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=533&fit=crop',
    available_colors: ['Navy'],
  },
  {
    id: '4', name: 'Essential Crew Neck Tee', slug: 'essential-crew-neck-tee',
    base_price: 999, mrp: 1499, discount_percent: 33, section_id: 'men',
    is_active: true, is_bestseller: true, is_new_arrival: false, tags: ['essential'],
    created_at: '', updated_at: '',
    primary_image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=533&fit=crop',
    available_colors: ['Black', 'White', 'Navy'],
  },
];

export function MenLanding() {
  return (
    <BrandLanding
      section="men"
      heroImage="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=900&fit=crop"
      heroTitle="Men"
      heroSubtitle="Contemporary menswear"
      categories={[
        { name: 'Shirts', href: '/collections/men-shirts', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=533&fit=crop' },
        { name: 'T-Shirts', href: '/collections/men-t-shirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=533&fit=crop' },
        { name: 'Trousers', href: '/collections/men-trousers', image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=533&fit=crop' },
        { name: 'Jackets', href: '/collections/men-jackets', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=533&fit=crop' },
        { name: 'Jeans', href: '/collections/men-jeans', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=533&fit=crop' },
        { name: 'Blazers', href: '/collections/men-blazers', image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400&h=533&fit=crop' },
        { name: 'Hoodies', href: '/collections/men-hoodies', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=533&fit=crop' },
        { name: 'Polos', href: '/collections/men-polos', image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=400&h=533&fit=crop' },
      ]}
      featuredProducts={featuredProducts}
      editorialImage="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop"
      editorialTitle="The Modern Gentleman"
      editorialSubtitle="Refined essentials for the contemporary man. From tailored blazers to crisp shirts, build your wardrobe with timeless pieces."
    />
  );
}
