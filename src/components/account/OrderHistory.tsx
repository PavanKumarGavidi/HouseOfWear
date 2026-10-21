import { Link } from 'react-router-dom';
import { Package, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import type { Order } from '../../types/database';

// Mock orders
const mockOrders: Order[] = [
  {
    id: 'order-1',
    order_number: 'HOW2406011234',
    user_id: 'user-123',
    status: 'delivered',
    subtotal: 4999,
    discount: 500,
    shipping: 0,
    tax: 0,
    total: 4499,
    payment_method: 'razorpay',
    payment_status: 'paid',
    created_at: '2024-06-01T10:30:00Z',
    updated_at: '2024-06-05T14:20:00Z',
    address_snapshot: {
      full_name: 'Arjun Sharma',
      phone: '+919876543210',
      address_line1: '123 Main Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      country: 'India',
    },
    loyalty_points_used: 0,
    loyalty_points_earned: 45,
  },
  {
    id: 'order-2',
    order_number: 'HOW2405285678',
    user_id: 'user-123',
    status: 'shipped',
    subtotal: 2999,
    discount: 0,
    shipping: 79,
    tax: 0,
    total: 3078,
    payment_method: 'cod',
    payment_status: 'pending',
    created_at: '2024-05-28T15:45:00Z',
    updated_at: '2024-05-30T09:15:00Z',
    address_snapshot: {
      full_name: 'Arjun Sharma',
      phone: '+919876543210',
      address_line1: '456 Park Avenue',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001',
      country: 'India',
    },
    loyalty_points_used: 0,
    loyalty_points_earned: 31,
  },
  {
    id: 'order-3',
    order_number: 'HOW2405159012',
    user_id: 'user-123',
    status: 'processing',
    subtotal: 7499,
    discount: 1000,
    shipping: 0,
    tax: 0,
    total: 6499,
    payment_method: 'razorpay',
    payment_status: 'paid',
    created_at: '2024-05-15T12:00:00Z',
    updated_at: '2024-05-16T08:30:00Z',
    address_snapshot: {
      full_name: 'Arjun Sharma',
      phone: '+919876543210',
      address_line1: '789 Lake View',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001',
      country: 'India',
    },
    loyalty_points_used: 500,
    loyalty_points_earned: 65,
  },
];

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  confirmed: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  processing: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  shipped: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
  delivered: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  returned: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400',
};

export function OrderHistory() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-light mb-8" style={{ fontFamily: 'var(--font-serif)' }}>
        My Orders
      </h1>

      {mockOrders.length === 0 ? (
        <div className="text-center py-16">
          <Package className="w-16 h-16 mx-auto text-brand-300 dark:text-brand-700 mb-4" />
          <h2 className="text-xl font-medium mb-2">No orders yet</h2>
          <p className="text-brand-600 dark:text-brand-400 mb-6">
            Start shopping to see your orders here
          </p>
          <Link
            to="/collections/new-arrivals"
            className="inline-flex items-center justify-center h-11 px-6 bg-brand-900 dark:bg-white text-white dark:text-brand-900 text-sm font-medium rounded hover:bg-brand-800 dark:hover:bg-brand-100 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {mockOrders.map((order) => (
            <Link
              key={order.id}
              to={`/account/orders/${order.id}`}
              className="block border border-brand-200 dark:border-brand-700 rounded-lg p-5 hover:border-brand-400 dark:hover:border-brand-500 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold">{order.order_number}</h3>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded ${statusColors[order.status]}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-brand-600 dark:text-brand-400 mb-1">
                    Placed on {new Date(order.created_at).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                  <p className="text-sm text-brand-600 dark:text-brand-400">
                    {order.payment_method === 'razorpay' ? 'Online Payment' : 'Cash on Delivery'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">₹{order.total.toLocaleString('en-IN')}</p>
                  <div className="flex items-center gap-1 text-xs text-brand-600 dark:text-brand-400 mt-1">
                    <span>View Details</span>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
