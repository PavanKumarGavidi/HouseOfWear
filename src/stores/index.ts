import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ============================================
// Cart Store
// ============================================

interface CartItem {
  id: string;
  variantId: string;
  productId: string;
  name: string;
  size: string;
  color: string;
  price: number;
  mrp: number;
  imageUrl?: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  couponCode: string | null;
  discount: number;
  
  // Actions
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;
  
  // Computed
  subtotal: () => number;
  totalItems: () => number;
  totalSavings: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: null,
      discount: 0,

      addItem: (item) => {
        const existing = get().items.find(
          (i) => i.variantId === item.variantId
        );
        
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.variantId === item.variantId
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          });
        } else {
          set({
            items: [...get().items, { ...item, id: crypto.randomUUID() }],
          });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, quantity } : i
          ),
        });
      },

      clearCart: () => set({ items: [], couponCode: null, discount: 0 }),

      applyCoupon: (code, discount) => {
        set({ couponCode: code, discount });
      },

      removeCoupon: () => set({ couponCode: null, discount: 0 }),

      subtotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      totalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      totalSavings: () => {
        const mrpTotal = get().items.reduce((sum, item) => sum + item.mrp * item.quantity, 0);
        const priceTotal = get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return mrpTotal - priceTotal + get().discount;
      },
    }),
    {
      name: 'how-cart',
    }
  )
);

// ============================================
// Wishlist Store
// ============================================

interface WishlistState {
  items: string[]; // product IDs
  toggle: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  clear: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      
      toggle: (productId) => {
        const isWishlisted = get().items.includes(productId);
        if (isWishlisted) {
          set({ items: get().items.filter((id) => id !== productId) });
        } else {
          set({ items: [...get().items, productId] });
        }
      },

      isWishlisted: (productId) => get().items.includes(productId),

      clear: () => set({ items: [] }),
    }),
    {
      name: 'how-wishlist',
    }
  )
);

// ============================================
// UI Store
// ============================================

interface UIState {
  darkMode: boolean;
  mobileMenuOpen: boolean;
  cartDrawerOpen: boolean;
  searchOpen: boolean;
  
  toggleDarkMode: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  setCartDrawerOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      darkMode: false,
      mobileMenuOpen: false,
      cartDrawerOpen: false,
      searchOpen: false,

      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
      setCartDrawerOpen: (open) => set({ cartDrawerOpen: open }),
      setSearchOpen: (open) => set({ searchOpen: open }),
    }),
    {
      name: 'how-ui',
    }
  )
);
