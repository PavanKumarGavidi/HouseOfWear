import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { HomePage } from '../pages/HomePage';
import { MenLanding } from '../pages/MenLanding';
import { WomenLanding } from '../pages/WomenLanding';
import { KidsLanding } from '../pages/KidsLanding';
import { ShoesLanding } from '../pages/ShoesLanding';
import { ProductListingPage } from '../pages/ProductListingPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { CartPage } from '../components/cart/CartPage';
import { CheckoutPage } from '../components/checkout/CheckoutPage';
import { OrderConfirmationPage } from '../components/checkout/OrderConfirmationPage';
import { LoginPage } from '../components/auth/LoginPage';
import { AccountDashboard } from '../components/account/AccountDashboard';
import { OrderHistory } from '../components/account/OrderHistory';
import { OrderDetail } from '../components/account/OrderDetail';
import { WishlistPage } from '../components/account/WishlistPage';
import { AddressBook } from '../components/account/AddressBook';
import { AdminLayout } from '../components/admin/AdminLayout';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { AdminProducts } from '../components/admin/AdminProducts';
import { AdminOrders } from '../components/admin/AdminOrders';
import { AdminCustomers } from '../components/admin/AdminCustomers';
import { AdminCoupons } from '../components/admin/AdminCoupons';
import { GiftCardsPage } from '../pages/GiftCardsPage';

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
      { path: 'search', element: <PlaceholderPage title="Search" /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'order-confirmation', element: <OrderConfirmationPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'account', element: <AccountDashboard /> },
      { path: 'account/orders', element: <OrderHistory /> },
      { path: 'account/orders/:id', element: <OrderDetail /> },
      { path: 'account/addresses', element: <AddressBook /> },
      { path: 'wishlist', element: <WishlistPage /> },
      { path: 'track-order', element: <PlaceholderPage title="Track Order" /> },
      { path: 'stores', element: <PlaceholderPage title="Store Locator" /> },
      { path: 'gift-cards', element: <GiftCardsPage /> },
      { path: 'about', element: <PlaceholderPage title="About Us" /> },
      { path: 'help', element: <PlaceholderPage title="Help & FAQ" /> },
      { path: 'contact', element: <PlaceholderPage title="Contact Us" /> },
      { path: 'blog', element: <PlaceholderPage title="Blog" /> },
      { path: 'terms', element: <PlaceholderPage title="Terms of Service" /> },
      { path: 'privacy', element: <PlaceholderPage title="Privacy Policy" /> },
      { path: 'careers', element: <PlaceholderPage title="Careers" /> },
      { path: '*', element: <PlaceholderPage title="404 - Page Not Found" /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'products', element: <AdminProducts /> },
      { path: 'orders', element: <AdminOrders /> },
      { path: 'customers', element: <AdminCustomers /> },
      { path: 'coupons', element: <AdminCoupons /> },
      { path: 'analytics', element: <PlaceholderPage title="Analytics" /> },
      { path: 'settings', element: <PlaceholderPage title="Settings" /> },
    ],
  },
]);
