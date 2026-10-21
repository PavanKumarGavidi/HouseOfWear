import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Heart, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ImageGallery } from '../components/pdp/ImageGallery';
import { SizeSelector } from '../components/pdp/SizeSelector';
import { ColorSelector } from '../components/pdp/ColorSelector';
import { PincodeChecker } from '../components/pdp/PincodeChecker';
import { ProductTabs } from '../components/pdp/ProductTabs';
import { StickyAddToBag } from '../components/pdp/StickyAddToBag';
import { SizeGuideModal } from '../components/pdp/SizeGuideModal';
import { RelatedProducts } from '../components/pdp/RelatedProducts';
import { ReviewsSection } from '../components/pdp/ReviewsSection';
import { Recommendations } from '../components/pdp/Recommendations';
import { BackInStockNotify } from '../components/pdp/BackInStockNotify';
import { useCartStore, useWishlistStore } from '../stores';
import { twMerge } from '../utils/cn';
import type { ProductWithDetails } from '../types/database';

// Mock product data - in real app, fetch from API
const mockProduct: ProductWithDetails = {
  id: '1',
  name: 'Classic Oxford Shirt',
  slug: 'classic-oxford-shirt',
  description: 'A timeless classic reimagined for the modern wardrobe. Crafted from premium cotton with a refined oxford weave, this shirt offers both comfort and sophistication. Perfect for both formal occasions and smart casual wear.',
  fabric_care: '100% Premium Cotton\nMachine wash cold with like colors\nTumble dry low\nWarm iron if needed\nDo not bleach',
  base_price: 2499,
  mrp: 3499,
  discount_percent: 29,
  section_id: 'men',
  category_id: 'shirts',
  is_active: true,
  is_bestseller: true,
  is_new_arrival: false,
  tags: ['formal', 'classic', 'cotton'],
  gender: 'men',
  fit: 'Regular',
  occasion: 'Formal',
  created_at: '2024-01-01',
  updated_at: '2024-01-15',
  images: [
    { id: '1', url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&h=1000&fit=crop', alt: 'Classic Oxford Shirt - Front', is_primary: true },
    { id: '2', url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=1000&fit=crop', alt: 'Classic Oxford Shirt - Back', is_primary: false },
    { id: '3', url: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&h=1000&fit=crop', alt: 'Classic Oxford Shirt - Detail', is_primary: false },
    { id: '4', url: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&h=1000&fit=crop', alt: 'Classic Oxford Shirt - Styled', is_primary: false },
  ],
  variants: [
    { id: 'v1', size: 'S', color: 'White', stock: 15, color_hex: '#FFFFFF' },
    { id: 'v2', size: 'M', color: 'White', stock: 20, color_hex: '#FFFFFF' },
    { id: 'v3', size: 'L', color: 'White', stock: 12, color_hex: '#FFFFFF' },
    { id: 'v4', size: 'XL', color: 'White', stock: 8, color_hex: '#FFFFFF' },
    { id: 'v5', size: 'S', color: 'Blue', stock: 10, color_hex: '#4A90D9' },
    { id: 'v6', size: 'M', color: 'Blue', stock: 18, color_hex: '#4A90D9' },
    { id: 'v7', size: 'L', color: 'Blue', stock: 0, color_hex: '#4A90D9' },
    { id: 'v8', size: 'XL', color: 'Blue', stock: 5, color_hex: '#4A90D9' },
    { id: 'v9', size: 'S', color: 'Pink', stock: 7, color_hex: '#FFB6C1' },
    { id: 'v10', size: 'M', color: 'Pink', stock: 0, color_hex: '#FFB6C1' },
    { id: 'v11', size: 'L', color: 'Pink', stock: 9, color_hex: '#FFB6C1' },
  ],
};

const mockRelatedProducts: ProductWithDetails[] = [
  {
    id: '2',
    name: 'Slim Fit Chinos',
    slug: 'slim-fit-chinos',
    base_price: 1999,
    mrp: 2999,
    discount_percent: 33,
    section_id: 'men',
    is_active: true,
    is_bestseller: true,
    is_new_arrival: false,
    tags: ['casual', 'cotton'],
    created_at: '2024-01-01',
    updated_at: '2024-01-15',
    images: [{ id: '1', url: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&h=1000&fit=crop', alt: 'Slim Fit Chinos', is_primary: true }],
  },
  {
    id: '3',
    name: 'Leather Belt',
    slug: 'leather-belt',
    base_price: 1299,
    mrp: 1999,
    discount_percent: 35,
    section_id: 'men',
    is_active: true,
    is_bestseller: false,
    is_new_arrival: true,
    tags: ['accessories', 'leather'],
    created_at: '2024-01-01',
    updated_at: '2024-01-15',
    images: [{ id: '1', url: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&h=1000&fit=crop', alt: 'Leather Belt', is_primary: true }],
  },
  {
    id: '4',
    name: 'Formal Leather Shoes',
    slug: 'formal-leather-shoes',
    base_price: 3999,
    mrp: 5999,
    discount_percent: 33,
    section_id: 'men',
    is_active: true,
    is_bestseller: true,
    is_new_arrival: false,
    tags: ['formal', 'leather', 'shoes'],
    created_at: '2024-01-01',
    updated_at: '2024-01-15',
    images: [{ id: '1', url: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&h=1000&fit=crop', alt: 'Formal Leather Shoes', is_primary: true }],
  },
  {
    id: '5',
    name: 'Cotton Blazer',
    slug: 'cotton-blazer',
    base_price: 4999,
    mrp: 7999,
    discount_percent: 37,
    section_id: 'men',
    is_active: true,
    is_bestseller: false,
    is_new_arrival: true,
    tags: ['formal', 'cotton'],
    created_at: '2024-01-01',
    updated_at: '2024-01-15',
    images: [{ id: '1', url: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&h=1000&fit=crop', alt: 'Cotton Blazer', is_primary: true }],
  },
];

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);

  const addToCart = useCartStore((state) => state.addItem);
  const { toggle: toggleWishlist, isWishlisted } = useWishlistStore();

  // In real app, fetch product by slug
  const product = mockProduct;

  // Extract unique colors and sizes from variants
  const variants = product.variants || [];
  const colors = Array.from(new Set(variants.map((v) => v.color))).map((color) => ({
    name: color,
    hex: variants.find((v) => v.color === color)?.color_hex || '#000000',
  }));

  const sizes = Array.from(new Set(variants.map((v) => v.size))).map((size) => {
    const hasStock = variants.some(
      (v) => v.size === size && v.color === selectedColor && v.stock > 0
    );
    return { value: size, inStock: hasStock };
  });

  // Get current variant stock
  const currentVariant = variants.find(
    (v) => v.size === selectedSize && v.color === selectedColor
  );
  const inStock = currentVariant ? currentVariant.stock > 0 : false;

  // Show sticky bar when scrolled past product info
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-select first available color
  useEffect(() => {
    if (!selectedColor && colors.length > 0) {
      setSelectedColor(colors[0].name);
    }
  }, [colors, selectedColor]);

  const handleAddToBag = () => {
    if (!selectedSize || !selectedColor || !inStock) return;

    addToCart({
      variantId: currentVariant?.id || '',
      productId: product.id,
      name: product.name,
      price: product.base_price,
      mrp: product.mrp,
      imageUrl: product.images?.[0]?.url || '',
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
    });
  };

  const handleCheckPincode = async (pincode: string) => {
    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      serviceable: true,
      deliveryDays: 3,
      codAvailable: true,
    };
  };

  return (
    <div className="min-h-screen bg-white dark:bg-brand-950">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-brand-600 dark:text-brand-400">
          <Link to="/" className="hover:text-brand-900 dark:hover:text-white">
            Home
          </Link>
          <span>/</span>
          <Link to={`/collections/${product.section_id}`} className="hover:text-brand-900 dark:hover:text-white">
            {product.section_id.charAt(0).toUpperCase() + product.section_id.slice(1)}
          </Link>
          <span>/</span>
          <span className="text-brand-900 dark:text-white">{product.name}</span>
        </nav>
      </div>

      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Image Gallery */}
          <div>
            <ImageGallery images={(product.images || []).map((img) => ({ url: img.url, alt: img.alt || img.alt_text || '' }))} />
          </div>

          {/* Right: Product Info */}
          <div className="space-y-6">
            {/* Title & Price */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                {product.is_bestseller && <Badge variant="info">Bestseller</Badge>}
                {product.is_new_arrival && <Badge variant="success">New Arrival</Badge>}
              </div>
              <h1 className="text-3xl font-semibold text-brand-900 dark:text-white mb-3">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-brand-900 dark:text-white">
                  ₹{product.base_price.toLocaleString('en-IN')}
                </span>
                {product.discount_percent > 0 && (
                  <>
                    <span className="text-xl text-brand-500 line-through">
                      ₹{product.mrp.toLocaleString('en-IN')}
                    </span>
                    <Badge variant="success">{product.discount_percent}% OFF</Badge>
                  </>
                )}
              </div>
              <p className="text-sm text-brand-600 dark:text-brand-400 mt-1">
                Inclusive of all taxes
              </p>
            </div>

            {/* Color Selector */}
            <ColorSelector
              colors={colors}
              selectedColor={selectedColor}
              onSelect={setSelectedColor}
            />

            {/* Size Selector */}
            <SizeSelector
              sizes={sizes}
              selectedSize={selectedSize}
              onSelect={setSelectedSize}
              onSizeGuideOpen={() => setSizeGuideOpen(true)}
            />

            {/* Stock Status */}
            {selectedSize && selectedColor && (
              <div className={twMerge('text-sm', inStock ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400')}>
                {inStock ? '✓ In Stock' : '✗ Out of Stock'}
              </div>
            )}

            {/* Add to Bag & Wishlist (Desktop) */}
            <div className="hidden lg:flex gap-3">
              <Button
                onClick={handleAddToBag}
                disabled={!selectedSize || !selectedColor || !inStock}
                className="flex-1"
                size="lg"
                leftIcon={<ShoppingBag className="w-5 h-5" />}
              >
                Add to Bag
              </Button>
              <Button
                onClick={() => toggleWishlist(product.id)}
                variant="outline"
                size="lg"
                className={twMerge(
                  isWishlisted(product.id) && 'border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                )}
                leftIcon={<Heart className={twMerge('w-5 h-5', isWishlisted(product.id) && 'fill-current')} />}
              >
                {isWishlisted(product.id) ? 'Wishlisted' : 'Wishlist'}
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-brand-200 dark:border-brand-700">
              <div className="flex flex-col items-center text-center">
                <Truck className="w-6 h-6 mb-2 text-brand-700 dark:text-brand-300" />
                <span className="text-xs text-brand-700 dark:text-brand-300">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Shield className="w-6 h-6 mb-2 text-brand-700 dark:text-brand-300" />
                <span className="text-xs text-brand-700 dark:text-brand-300">Secure Payment</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <RotateCcw className="w-6 h-6 mb-2 text-brand-700 dark:text-brand-300" />
                <span className="text-xs text-brand-700 dark:text-brand-300">Easy Returns</span>
              </div>
            </div>

            {/* Pincode Checker */}
            <PincodeChecker onCheck={handleCheckPincode} />

            {/* Product Tabs */}
            <ProductTabs
              description={product.description || ''}
              fabricCare={product.fabric_care || ''}
              shippingReturns="Free shipping on orders above ₹999\nStandard delivery: 3-5 business days\nExpress delivery: 1-2 business days\n\nEasy 7-day returns\nFree return shipping\nRefund processed within 5-7 business days"
            />
          </div>
        </div>

        {/* Related Products */}
        <RelatedProducts title="Complete the Look" products={mockRelatedProducts} />

        {/* Back in Stock Notification */}
        {!inStock && (
          <div className="mt-8">
            <BackInStockNotify productName={product.name} variantId={currentVariant?.id || ''} />
          </div>
        )}

        {/* Reviews Section */}
        <ReviewsSection productId={product.id} avgRating={4.5} reviewCount={224} />

        {/* Recommendations */}
        <Recommendations title="You May Also Like" products={mockRelatedProducts.slice(0, 4)} />
      </div>

      {/* Sticky Add to Bag (Mobile) */}
      <StickyAddToBag
        price={product.base_price}
        originalPrice={product.mrp}
        discount={product.discount_percent}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
        onAddToBag={handleAddToBag}
        onToggleWishlist={() => toggleWishlist(product.id)}
        isWishlisted={isWishlisted(product.id)}
        isVisible={showStickyBar}
      />

      {/* Size Guide Modal */}
      <SizeGuideModal isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
    </div>
  );
}
