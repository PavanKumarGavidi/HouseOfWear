// Analytics utility for GA4/GTM event tracking

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

/**
 * Initialize Google Analytics
 */
export function initGA(measurementId: string) {
  if (typeof window === 'undefined') return;

  // Load GA4 script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    if (window.dataLayer) {
      window.dataLayer.push(arguments);
    }
  };
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    send_page_view: true,
  });
}

/**
 * Track page view
 */
export function trackPageView(path: string, title?: string) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('config', getMeasurementId(), {
    page_path: path,
    page_title: title,
  });
}

/**
 * Track e-commerce event: view_item
 */
export function trackViewItem(product: {
  id: string;
  name: string;
  price: number;
  category?: string;
  brand?: string;
  variant?: string;
}) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'view_item', {
    currency: 'INR',
    value: product.price,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        item_category: product.category,
        item_brand: product.brand || 'House of Wear',
        item_variant: product.variant,
      },
    ],
  });
}

/**
 * Track e-commerce event: add_to_cart
 */
export function trackAddToCart(product: {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category?: string;
  variant?: string;
}) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'add_to_cart', {
    currency: 'INR',
    value: product.price * product.quantity,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        quantity: product.quantity,
        item_category: product.category,
        item_brand: 'House of Wear',
        item_variant: product.variant,
      },
    ],
  });
}

/**
 * Track e-commerce event: remove_from_cart
 */
export function trackRemoveFromCart(product: {
  id: string;
  name: string;
  price: number;
  quantity: number;
}) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'remove_from_cart', {
    currency: 'INR',
    value: product.price * product.quantity,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        quantity: product.quantity,
      },
    ],
  });
}

/**
 * Track e-commerce event: begin_checkout
 */
export function trackBeginCheckout(cart: {
  value: number;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  coupon?: string;
}) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'begin_checkout', {
    currency: 'INR',
    value: cart.value,
    coupon: cart.coupon,
    items: cart.items.map(item => ({
      item_id: item.id,
      item_name: item.name,
      price: item.price,
      quantity: item.quantity,
    })),
  });
}

/**
 * Track e-commerce event: purchase
 */
export function trackPurchase(order: {
  id: string;
  value: number;
  tax?: number;
  shipping?: number;
  coupon?: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
}) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'purchase', {
    transaction_id: order.id,
    currency: 'INR',
    value: order.value,
    tax: order.tax,
    shipping: order.shipping,
    coupon: order.coupon,
    items: order.items.map(item => ({
      item_id: item.id,
      item_name: item.name,
      price: item.price,
      quantity: item.quantity,
    })),
  });
}

/**
 * Track e-commerce event: view_item_list
 */
export function trackViewItemList(listName: string, products: Array<{
  id: string;
  name: string;
  price: number;
  category?: string;
}>) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'view_item_list', {
    item_list_name: listName,
    items: products.map((product, index) => ({
      item_id: product.id,
      item_name: product.name,
      price: product.price,
      item_category: product.category,
      index: index,
    })),
  });
}

/**
 * Track e-commerce event: select_item
 */
export function trackSelectItem(product: {
  id: string;
  name: string;
  price: number;
  category?: string;
}, listName?: string) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'select_content', {
    content_type: 'product',
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        item_category: product.category,
      },
    ],
  });
}

/**
 * Track search event
 */
export function trackSearch(searchTerm: string, resultsCount?: number) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'search', {
    search_term: searchTerm,
    results_count: resultsCount,
  });
}

/**
 * Track login event
 */
export function trackLogin(method: string) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'login', {
    method: method,
  });
}

/**
 * Track sign_up event
 */
export function trackSignUp(method: string) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'sign_up', {
    method: method,
  });
}

/**
 * Track custom event
 */
export function trackCustomEvent(eventName: string, parameters?: Record<string, any>) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', eventName, parameters);
}

/**
 * Get measurement ID from environment
 */
function getMeasurementId(): string {
  return import.meta.env.VITE_GA_MEASUREMENT_ID || '';
}

/**
 * Track exception/error
 */
export function trackException(error: Error, fatal: boolean = false) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'exception', {
    description: error.message,
    fatal: fatal,
  });
}
