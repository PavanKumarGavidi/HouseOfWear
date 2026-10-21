import { useParams, Link } from 'react-router-dom';
import { Package, MapPin, CreditCard, Truck, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import type { Order } from '../../types/database';

// Mock order details
const mockOrderDetails: Record<string, Order & { items: any[] }> = {
  'order-1': {
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
      address_line1: '123 Main Street, Apartment 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      country: 'India',
    },
    loyalty_points_used: 0,
    loyalty_points_earned: 45,
    items: [
      {
        id: 'item-1',
        name: 'Classic Oxford Shirt',
        size: 'M',
        color: 'White',
        quantity: 2,
        price: 2499,
        image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=200&h=250&fit=crop',
      },
    ],
  },
  'order-2': {
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
    items: [
      {
        id: 'item-2',
        name: 'Slim Fit Chinos',
        size: '32',
        color: 'Khaki',
        quantity: 1,
        price: 2999,
        image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=200&h=250&fit=crop',
      },
    ],
  },
  'order-3': {
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
    items: [
      {
        id: 'item-3',
        name: 'Bomber Jacket',
        size: 'L',
        color: 'Navy',
        quantity: 1,
        price: 4999,
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&h=250&fit=crop',
      },
      {
        id: 'item-4',
        name: 'Essential Crew Neck Tee',
        size: 'M',
        color: 'Black',
        quantity: 1,
        price: 2499,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=250&fit=crop',
      },
    ],
  },
};

const trackingSteps = [
  { status: 'pending', label: 'Order Placed', icon: Clock },
  { status: 'confirmed', label: 'Confirmed', icon: CheckCircle },
  { status: 'processing', label: 'Processing', icon: Package },
  { status: 'shipped', label: 'Shipped', icon: Truck },
  { status: 'delivered', label: 'Delivered', icon: CheckCircle },
];

export function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();

  if (!user || !id) return null;

  const order = mockOrderDetails[id];

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <Package className="w-16 h-16 mx-auto text-brand-300 dark:text-brand-700 mb-4" />
        <h2 className="text-xl font-medium mb-2">Order not found</h2>
        <Link to="/account/orders" className="text-sm text-brand-600 dark:text-brand-400 hover:underline">
          ← Back to Orders
        </Link>
      </div>
    );
  }

  const currentStepIndex = trackingSteps.findIndex((step) => step.status === order.status);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link to="/account/orders" className="text-sm text-brand-600 dark:text-brand-400 hover:underline mb-2 inline-block">
          ← Back to Orders
        </Link>
        <h1 className="text-3xl font-light" style={{ fontFamily: 'var(--font-serif)' }}>
          Order {order.order_number}
        </h1>
      </div>

      {/* Tracking Timeline */}
      <div className="border border-brand-200 dark:border-brand-700 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold mb-6">Order Status</h2>
        <div className="relative">
          {trackingSteps.map((step, index) => {
            const isCompleted = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;
            const Icon = step.icon;

            return (
              <div key={step.status} className="flex items-start gap-4 mb-6 last:mb-0">
                <div className="relative flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isCompleted
                        ? 'bg-green-500 text-white'
                        : 'bg-brand-100 dark:bg-brand-800 text-brand-400'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  {index < trackingSteps.length - 1 && (
                    <div
                      className={`w-0.5 h-12 ${
                        index < currentStepIndex ? 'bg-green-500' : 'bg-brand-200 dark:bg-brand-700'
                      }`}
                    />
                  )}
                </div>
                <div className="flex-1 pt-2">
                  <p className={`font-medium ${isCompleted ? 'text-brand-900 dark:text-white' : 'text-brand-400'}`}>
                    {step.label}
                  </p>
                  {isCurrent && (
                    <p className="text-sm text-brand-600 dark:text-brand-400 mt-1">
                      {order.status === 'delivered'
                        ? 'Delivered on June 5, 2024'
                        : order.status === 'shipped'
                        ? 'Out for delivery'
                        : 'In progress'}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Order Items */}
      <div className="border border-brand-200 dark:border-brand-700 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Items</h2>
        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="w-20 h-24 bg-brand-100 dark:bg-brand-800 rounded overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-brand-600 dark:text-brand-400 mt-1">
                  Size: {item.size} | Color: {item.color} | Qty: {item.quantity}
                </p>
                <p className="text-sm font-semibold mt-2">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="grid sm:grid-cols-2 gap-6">
        {/* Delivery Address */}
        <div className="border border-brand-200 dark:border-brand-700 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Delivery Address
          </h2>
          <div className="text-sm text-brand-700 dark:text-brand-300 space-y-1">
            <p className="font-medium">{order.address_snapshot.full_name}</p>
            <p>{order.address_snapshot.address_line1}</p>
            <p>
              {order.address_snapshot.city}, {order.address_snapshot.state} -{' '}
              {order.address_snapshot.pincode}
            </p>
            <p>Phone: {order.address_snapshot.phone}</p>
          </div>
        </div>

        {/* Payment & Summary */}
        <div className="border border-brand-200 dark:border-brand-700 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Payment Summary
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-brand-600 dark:text-brand-400">Subtotal</span>
              <span>₹{order.subtotal.toLocaleString('en-IN')}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-green-600 dark:text-green-400">
                <span>Discount</span>
                <span>-₹{order.discount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-brand-600 dark:text-brand-400">Shipping</span>
              <span>{order.shipping === 0 ? 'FREE' : `₹${order.shipping}`}</span>
            </div>
            <div className="border-t border-brand-200 dark:border-brand-700 pt-2 flex justify-between font-semibold">
              <span>Total</span>
              <span>₹{order.total.toLocaleString('en-IN')}</span>
            </div>
            <div className="pt-2 text-xs text-brand-600 dark:text-brand-400">
              <p>Payment: {order.payment_method === 'razorpay' ? 'Online Payment' : 'Cash on Delivery'}</p>
              <p>Status: {order.payment_status === 'paid' ? 'Paid' : 'Pending'}</p>
              {order.loyalty_points_earned! > 0 && (
                <p className="text-green-600 dark:text-green-400 mt-1">
                  +{order.loyalty_points_earned} loyalty points earned
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      {order.status === 'delivered' && (
        <div className="mt-6 flex gap-3">
          <button className="flex-1 h-11 px-6 border border-brand-200 dark:border-brand-700 text-brand-900 dark:text-white text-sm font-medium rounded hover:bg-brand-50 dark:hover:bg-brand-900 transition-colors">
            Return/Exchange
          </button>
          <button className="flex-1 h-11 px-6 bg-brand-900 dark:bg-white text-white dark:text-brand-900 text-sm font-medium rounded hover:bg-brand-800 dark:hover:bg-brand-100 transition-colors">
            Write Review
          </button>
        </div>
      )}
    </div>
  );
}
