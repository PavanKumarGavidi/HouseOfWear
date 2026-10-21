import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2, Minus, Plus, Heart } from 'lucide-react';
import { Button, ButtonLink } from '../ui/Button';
import { useCartStore, useWishlistStore } from '../../stores';
import { CouponInput } from './CouponInput';
import { twMerge } from '../../utils/cn';

export function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, totalItems, applyCoupon, removeCoupon, couponCode, discount } = useCartStore();
  const { toggle: toggleWishlist } = useWishlistStore();

  const shipping = subtotal() >= 999 ? 0 : 79;
  const total = subtotal() - discount + shipping;

  const handleApplyCoupon = async (code: string) => {
    // Mock coupon validation
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const coupons: Record<string, { discount: number; message: string }> = {
      'WELCOME10': { discount: Math.min(subtotal() * 0.1, 500), message: '10% off applied' },
      'SUMMER14': { discount: Math.min(subtotal() * 0.14, 2000), message: '14% off applied' },
      'FLAT500': { discount: 500, message: '₹500 off applied' },
    };

    const coupon = coupons[code];
    if (coupon) {
      applyCoupon(code, coupon.discount);
      return { success: true, discount: coupon.discount, message: coupon.message };
    }
    return { success: false, discount: 0, message: 'Invalid coupon code' };
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <ShoppingBag className="w-16 h-16 mx-auto text-brand-300 dark:text-brand-700 mb-4" />
        <h1 className="text-2xl font-semibold mb-2">Your bag is empty</h1>
        <p className="text-brand-600 dark:text-brand-400 mb-6">
          Looks like you haven't added anything to your bag yet.
        </p>
        <ButtonLink href="/collections/new-arrivals" size="lg">
          Start Shopping
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-light mb-8" style={{ fontFamily: 'var(--font-serif)' }}>
        Shopping Bag ({totalItems()})
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 p-4 border border-brand-200 dark:border-brand-700 rounded-lg"
            >
              {/* Image */}
              <Link to={`/products/${item.productId}`} className="flex-shrink-0">
                <div className="w-24 h-32 bg-brand-100 dark:bg-brand-800 rounded overflow-hidden">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingBag className="w-8 h-8 text-brand-400" />
                    </div>
                  )}
                </div>
              </Link>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-2">
                  <div>
                    <Link to={`/products/${item.productId}`} className="font-medium hover:underline">
                      {item.name}
                    </Link>
                    <p className="text-sm text-brand-600 dark:text-brand-400 mt-1">
                      Size: {item.size} | Color: {item.color}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1 hover:bg-brand-100 dark:hover:bg-brand-800 rounded transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4 text-brand-500" />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-4">
                  {/* Quantity */}
                  <div className="flex items-center border border-brand-200 dark:border-brand-700 rounded">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-brand-100 dark:hover:bg-brand-800 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-brand-100 dark:hover:bg-brand-800 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="font-semibold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                    {item.mrp > item.price && (
                      <p className="text-xs text-brand-500 line-through">
                        ₹{(item.mrp * item.quantity).toLocaleString('en-IN')}
                      </p>
                    )}
                  </div>
                </div>

                {/* Move to Wishlist */}
                <button
                  onClick={() => {
                    toggleWishlist(item.productId);
                    removeItem(item.id);
                  }}
                  className="flex items-center gap-1 mt-3 text-xs text-brand-600 dark:text-brand-400 hover:text-brand-900 dark:hover:text-white transition-colors"
                >
                  <Heart className="w-3 h-3" />
                  Move to Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 border border-brand-200 dark:border-brand-700 rounded-lg p-6 space-y-4">
            <h2 className="text-lg font-semibold">Order Summary</h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-brand-600 dark:text-brand-400">Subtotal</span>
                <span>₹{subtotal().toLocaleString('en-IN')}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600 dark:text-green-400">
                  <span>Discount</span>
                  <span>-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-brand-600 dark:text-brand-400">Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>
              <div className="border-t border-brand-200 dark:border-brand-700 pt-2 flex justify-between font-semibold text-base">
                <span>Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {shipping > 0 && (
              <p className="text-xs text-brand-500 dark:text-brand-400">
                Add ₹{(999 - subtotal()).toLocaleString('en-IN')} more for free shipping
              </p>
            )}

            {/* Coupon */}
            <CouponInput
              onApply={handleApplyCoupon}
              onRemove={removeCoupon}
              appliedCoupon={couponCode}
              discount={discount}
            />

            {/* Checkout Button */}
            <ButtonLink href="/checkout" fullWidth size="lg">
              Proceed to Checkout
            </ButtonLink>

            <p className="text-xs text-center text-brand-500 dark:text-brand-400">
              Secure checkout powered by Razorpay
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
