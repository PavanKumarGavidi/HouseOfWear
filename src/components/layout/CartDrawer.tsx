import { Link } from 'react-router-dom';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Drawer } from '../ui/Drawer';
import { Button, ButtonLink } from '../ui/Button';
import { useUIStore, useCartStore } from '../../stores';

export function CartDrawer() {
  const { cartDrawerOpen, setCartDrawerOpen } = useUIStore();
  const { items, removeItem, updateQuantity, subtotal, totalItems } = useCartStore();

  const close = () => setCartDrawerOpen(false);

  return (
    <Drawer
      isOpen={cartDrawerOpen}
      onClose={close}
      title={`Your Bag (${totalItems()})`}
    >
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full px-8 text-center">
          <ShoppingBag className="w-12 h-12 text-brand-300 dark:text-brand-700 mb-4" />
          <h3 className="text-lg font-medium mb-2">Your bag is empty</h3>
          <p className="text-sm text-brand-500 mb-6">
            Looks like you haven't added anything yet.
          </p>
          <ButtonLink onClick={close} href="/collections/new-arrivals" fullWidth>
            Start Shopping
          </ButtonLink>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          {/* Items */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3">
                {/* Image */}
                <div className="w-20 h-24 rounded bg-brand-100 dark:bg-brand-800 overflow-hidden flex-shrink-0">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-brand-400">
                      <ShoppingBag className="w-6 h-6" />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2">
                    <h4 className="text-sm font-medium line-clamp-2">{item.name}</h4>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 -mr-1 hover:bg-brand-100 dark:hover:bg-brand-800 rounded flex-shrink-0"
                      aria-label="Remove item"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <p className="text-xs text-brand-500 mt-0.5">
                    {item.size} / {item.color}
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    {/* Quantity */}
                    <div className="flex items-center border border-brand-200 dark:border-brand-700 rounded">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 hover:bg-brand-100 dark:hover:bg-brand-800 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-xs font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 hover:bg-brand-100 dark:hover:bg-brand-800 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Price */}
                    <span className="text-sm font-semibold">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t border-brand-100 dark:border-brand-800 px-4 py-4 space-y-3 flex-shrink-0">
            {/* Subtotal */}
            <div className="flex justify-between text-sm">
              <span className="text-brand-600 dark:text-brand-400">Subtotal</span>
              <span className="font-semibold">₹{subtotal().toLocaleString('en-IN')}</span>
            </div>

            <p className="text-xs text-brand-500 text-center">
              Shipping and taxes calculated at checkout
            </p>

            {/* Actions */}
            <ButtonLink
              href="/checkout"
              onClick={close}
              fullWidth
              size="lg"
            >
              Checkout
            </ButtonLink>
            
            <ButtonLink
              href="/cart"
              onClick={close}
              variant="outline"
              fullWidth
            >
              View Bag
            </ButtonLink>
          </div>
        </div>
      )}
    </Drawer>
  );
}
