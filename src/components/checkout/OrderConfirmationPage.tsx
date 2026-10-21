import { useLocation, Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Truck, MapPin } from 'lucide-react';
import { ButtonLink } from '../ui/Button';

export function OrderConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, total, address, paymentMethod } = location.state || {};

  if (!orderId) {
    navigate('/');
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Success Icon */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
          <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
        </div>
        <h1 className="text-3xl font-light mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
          Order Confirmed!
        </h1>
        <p className="text-brand-600 dark:text-brand-400">
          Thank you for your order. We've received your order and will process it shortly.
        </p>
      </div>

      {/* Order Details */}
      <div className="border border-brand-200 dark:border-brand-700 rounded-lg p-6 space-y-6">
        {/* Order ID */}
        <div className="flex items-center justify-between pb-4 border-b border-brand-200 dark:border-brand-700">
          <div>
            <p className="text-sm text-brand-600 dark:text-brand-400">Order Number</p>
            <p className="text-lg font-semibold">{orderId}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-brand-600 dark:text-brand-400">Total Amount</p>
            <p className="text-lg font-semibold">₹{total?.toLocaleString('en-IN')}</p>
          </div>
        </div>

        {/* Delivery Address */}
        {address && (
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-brand-600 dark:text-brand-400 mt-0.5" />
            <div>
              <p className="text-sm font-medium mb-1">Delivery Address</p>
              <p className="text-sm text-brand-600 dark:text-brand-400">
                {address.name}
              </p>
              <p className="text-sm text-brand-600 dark:text-brand-400">
                {address.street}
              </p>
              <p className="text-sm text-brand-600 dark:text-brand-400">
                {address.city}, {address.state} - {address.pincode}
              </p>
              <p className="text-sm text-brand-600 dark:text-brand-400">
                Phone: {address.phone}
              </p>
            </div>
          </div>
        )}

        {/* Payment Method */}
        <div className="flex items-start gap-3">
          <Package className="w-5 h-5 text-brand-600 dark:text-brand-400 mt-0.5" />
          <div>
            <p className="text-sm font-medium mb-1">Payment Method</p>
            <p className="text-sm text-brand-600 dark:text-brand-400">
              {paymentMethod === 'razorpay' ? 'Online Payment (Razorpay)' : 'Cash on Delivery'}
            </p>
          </div>
        </div>

        {/* Estimated Delivery */}
        <div className="flex items-start gap-3">
          <Truck className="w-5 h-5 text-brand-600 dark:text-brand-400 mt-0.5" />
          <div>
            <p className="text-sm font-medium mb-1">Estimated Delivery</p>
            <p className="text-sm text-brand-600 dark:text-brand-400">
              3-5 business days
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <ButtonLink href="/account/orders" fullWidth>
          View Orders
        </ButtonLink>
        <ButtonLink href="/collections/new-arrivals" variant="outline" fullWidth>
          Continue Shopping
        </ButtonLink>
      </div>

      {/* Info */}
      <div className="mt-8 p-4 bg-brand-50 dark:bg-brand-900 rounded-lg">
        <p className="text-sm text-brand-700 dark:text-brand-300 text-center">
          A confirmation email has been sent to your registered email address.
          You can track your order status in your account.
        </p>
      </div>
    </div>
  );
}
