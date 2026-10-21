import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { Button, ButtonLink } from '../ui/Button';
import { ProductGrid, ProductCard } from '../ui/ProductCard';
import { useWishlistStore, useCartStore } from '../../stores';
import type { ProductWithDetails } from '../../types/database';

// Mock wishlist products
const mockWishlistProducts: ProductWithDetails[] = [
  {
    id: '1',
    name: 'Classic Oxford Shirt',
    slug: 'classic-oxford-shirt',
    base_price: 2499,
    mrp: 3499,
    discount_percent: 29,
    section_id: 'men',
    is_active: true,
    is_bestseller: true,
    is_new_arrival: false,
    tags: ['formal'],
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
    tags: ['dress'],
    created_at: '',
    updated_at: '',
    primary_image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=533&fit=crop',
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
    tags: ['sneakers'],
    created_at: '',
    updated_at: '',
    primary_image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=533&fit=crop',
    available_colors: ['White', 'Black'],
  },
];

export function WishlistPage() {
  const { items: wishlistIds, toggle } = useWishlistStore();
  const { addItem } = useCartStore();

  // Filter mock products by wishlist IDs
  const wishlistProducts = mockWishlistProducts.filter((p) => wishlistIds.includes(p.id));

  const handleAddToCart = (product: ProductWithDetails) => {
    // In real app, would need to select size/color first
    addItem({
      variantId: `${product.id}-variant`,
      productId: product.id,
      name: product.name,
      price: product.base_price,
      mrp: product.mrp,
      imageUrl: product.primary_image || '',
      size: 'M',
      color: product.available_colors?.[0] || 'Default',
      quantity: 1,
    });
  };

  if (wishlistProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <Heart className="w-16 h-16 mx-auto text-brand-300 dark:text-brand-700 mb-4" />
        <h1 className="text-2xl font-semibold mb-2">Your wishlist is empty</h1>
        <p className="text-brand-600 dark:text-brand-400 mb-6">
          Save your favorite items to buy them later
        </p>
        <ButtonLink href="/collections/new-arrivals" size="lg">
          Start Shopping
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-light" style={{ fontFamily: 'var(--font-serif)' }}>
          My Wishlist ({wishlistProducts.length})
        </h1>
      </div>

      <ProductGrid columns={4}>
        {wishlistProducts.map((product) => (
          <div key={product.id} className="relative group">
            <ProductCard product={product} isWishlisted onWishlistToggle={toggle} />
            
            {/* Quick Add Button */}
            <div className="mt-3">
              <Button
                onClick={() => handleAddToCart(product)}
                variant="outline"
                fullWidth
                size="sm"
                leftIcon={<ShoppingBag className="w-4 h-4" />}
              >
                Add to Bag
              </Button>
            </div>
          </div>
        ))}
      </ProductGrid>
    </div>
  );
}
