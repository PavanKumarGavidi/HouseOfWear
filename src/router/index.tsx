import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { HomePage } from '../pages/HomePage';
import { MenLanding } from '../pages/MenLanding';
import { WomenLanding } from '../pages/WomenLanding';
import { KidsLanding } from '../pages/KidsLanding';
import { ShoesLanding } from '../pages/ShoesLanding';
import { ProductListingPage } from '../pages/ProductListingPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';

// Placeholder pages
function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <h1 className="text-3xl font-light mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
        {title}
      </h1>
      <p className="text-brand-500">Coming soon in Phase 3+</p>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'collections', element: <PlaceholderPage title="All Collections" /> },
      { path: 'collections/men', element: <MenLanding /> },
      { path: 'collections/women', element: <WomenLanding /> },
      { path: 'collections/kids', element: <KidsLanding /> },
      { path: 'collections/shoes', element: <ShoesLanding /> },
      { path: 'collections/:section', element: <ProductListingPage /> },
      { path: 'collections/:section/:category', element: <ProductListingPage /> },
      { path: 'products/:slug', element: <ProductDetailPage /> },
      { path: 'products/:slug', element: <PlaceholderPage title="Product Detail" /> },
      { path: 'search', element: <PlaceholderPage title="Search" /> },
      { path: 'cart', element: <PlaceholderPage title="Shopping Bag" /> },
      { path: 'checkout', element: <PlaceholderPage title="Checkout" /> },
      { path: 'account', element: <PlaceholderPage title="My Account" /> },
      { path: 'account/orders', element: <PlaceholderPage title="My Orders" /> },
      { path: 'account/orders/:id', element: <PlaceholderPage title="Order Detail" /> },
      { path: 'wishlist', element: <PlaceholderPage title="Wishlist" /> },
      { path: 'track-order', element: <PlaceholderPage title="Track Order" /> },
      { path: 'stores', element: <PlaceholderPage title="Store Locator" /> },
      { path: 'gift-cards', element: <PlaceholderPage title="Gift Cards" /> },
      { path: 'about', element: <PlaceholderPage title="About Us" /> },
      { path: 'help', element: <PlaceholderPage title="Help & FAQ" /> },
      { path: 'contact', element: <PlaceholderPage title="Contact Us" /> },
      { path: 'blog', element: <PlaceholderPage title="Blog" /> },
      { path: 'terms', element: <PlaceholderPage title="Terms of Service" /> },
      { path: 'privacy', element: <PlaceholderPage title="Privacy Policy" /> },
      { path: 'careers', element: <PlaceholderPage title="Careers" /> },
      { path: 'admin', element: <PlaceholderPage title="Admin Dashboard" /> },
      { path: '*', element: <PlaceholderPage title="404 - Page Not Found" /> },
    ],
  },
]);
