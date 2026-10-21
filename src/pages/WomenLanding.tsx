import { BrandLanding } from '../components/brand/BrandLanding';
import type { ProductWithDetails } from '../types/database';

const featuredProducts: ProductWithDetails[] = [
  {
    id: '10', name: 'Midi Wrap Dress - Floral', slug: 'midi-wrap-dress-floral',
    base_price: 3499, mrp: 4999, discount_percent: 30, section_id: 'women',
    is_active: true, is_bestseller: true, is_new_arrival: false, tags: ['dress'],
    created_at: '', updated_at: '',
    primary_image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=533&fit=crop',
    hover_image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=533&fit=crop',
    available_colors: ['Floral'],
  },
  {
    id: '11', name: 'Silk Blouse - Ivory', slug: 'silk-blouse-ivory',
    base_price: 3999, mrp: 5999, discount_percent: 33, section_id: 'women',
    is_active: true, is_bestseller: true, is_new_arrival: false, tags: ['luxury'],
    created_at: '', updated_at: '',
    primary_image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400&h=533&fit=crop',
    available_colors: ['Ivory'],
  },
  {
    id: '12', name: 'High Rise Skinny Jeans', slug: 'high-rise-skinny-jeans',
    base_price: 2799, mrp: 3999, discount_percent: 30, section_id: 'women',
    is_active: true, is_bestseller: true, is_new_arrival: false, tags: ['denim'],
    created_at: '', updated_at: '',
    primary_image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=533&fit=crop',
    available_colors: ['Dark Indigo', 'Black'],
  },
  {
    id: '13', name: 'Wide Leg Palazzo Pants', slug: 'wide-leg-palazzo-pants',
    base_price: 2499, mrp: 3499, discount_percent: 29, section_id: 'women',
    is_active: true, is_bestseller: true, is_new_arrival: false, tags: ['elegant'],
    created_at: '', updated_at: '',
    primary_image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=533&fit=crop',
    available_colors: ['Black', 'Beige'],
  },
];

export function WomenLanding() {
  return (
    <BrandLanding
      section="women"
      heroImage="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1920&h=900&fit=crop"
      heroTitle="Women"
      heroSubtitle="Effortless elegance"
      categories={[
        { name: 'Dresses', href: '/collections/women-dresses', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=533&fit=crop' },
        { name: 'Tops', href: '/collections/women-tops', image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400&h=533&fit=crop' },
        { name: 'Trousers', href: '/collections/women-trousers', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=533&fit=crop' },
        { name: 'Jeans', href: '/collections/women-jeans', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=533&fit=crop' },
        { name: 'Blazers', href: '/collections/women-blazers', image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=400&h=533&fit=crop' },
        { name: 'Skirts', href: '/collections/women-skirts', image: 'https://images.unsplash.com/photo-1583445095389-978711-978711?w=400&h=533&fit=crop' },
        { name: 'Co-ords', href: '/collections/women-co-ords', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=533&fit=crop' },
        { name: 'Jackets', href: '/collections/women-jackets', image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400&h=533&fit=crop' },
      ]}
      featuredProducts={featuredProducts}
      editorialImage="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&h=600&fit=crop"
      editorialTitle="The Modern Woman"
      editorialSubtitle="Effortless pieces that transition from day to night. Discover refined essentials for every occasion."
    />
  );
}
