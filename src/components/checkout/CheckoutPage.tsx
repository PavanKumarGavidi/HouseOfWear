import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, Truck, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useCartStore } from '../../stores';
import { twMerge } from '../../utils/cn';

interface Address {
  id: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, discount, couponCode, clearCart } = useCartStore();
  
  const [step, setStep] = useState<'address' | 'payment' | 'confirm'>('address');
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'cod'>('razorpay');
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock saved addresses
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      name: 'John Doe',
      phone: '+91 98765 43210',
      street: '123 Main Street, Apartment 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      isDefault: true,
    },
  ]);

  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState<Partial<Address>>({});

  const shipping = subtotal() >= 999 ? 0 : 79;
  const total = subtotal() - discount + shipping;

  const handleAddAddress = () => {
    if (newAddress.name && newAddress.phone && newAddress.street && newAddress.city && newAddress.state && newAddress.pincode) {
      const address: Address = {
        id: Date.now().toString(),
        name: newAddress.name!,
        phone: newAddress.phone!,
        street: newAddress.street!,
        city: newAddress.city!,
        state: newAddress.state!,
        pincode: newAddress.pincode!,
        isDefault: addresses.length === 0,
      };
      setAddresses([...addresses, address]);
      setSelectedAddress(address.id);
      setShowAddAddress(false);
      setNewAddress({});
    }
  };

  const handlePayment = async () => {
    if (!selectedAddress) return;

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock Razorpay integration
    if (paymentMethod === 'razorpay') {
      // In real app, integrate Razorpay SDK here
      console.log('Processing Razorpay payment...');
    }

    // Clear cart and navigate to confirmation
    clearCart();
    navigate('/order-confirmation', {
      state: {
        orderId: `ORD-${Date.now()}`,
        total,
        address: addresses.find(a => a.id === selectedAddress),
        paymentMethod,
      },
    });
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-light mb-8" style={{ fontFamily: 'var(--font-serif)' }}>
        Checkout
      </h1>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center gap-2">
          <div className={twMerge(
            'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
            step === 'address' ? 'bg-brand-900 text-white dark:bg-white dark:text-brand-900' : 'bg-green-500 text-white'
          )}>
            {step === 'address' ? '1' : <Check className="w-4 h-4" />}
          </div>
          <span className="text-sm font-medium">Address</span>
        </div>
        <div className="w-16 h-px bg-brand-300 dark:bg-brand-700 mx-2" />
        <div className={twMerge(
          'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
          step === 'payment' ? 'bg-brand-900 text-white dark:bg-white dark:text-brand-900' : 
          step === 'confirm' ? 'bg-green-500 text-white' : 'bg-brand-200 dark:bg-brand-800 text-brand-500'
        )}>
          {step === 'payment' ? '2' : step === 'confirm' ? <Check className="w-4 h-4" /> : '2'}
        </div>
        <span className="text-sm font-medium ml-2">Payment</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {step === 'address' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Delivery Address</h2>
                <Button onClick={() => setShowAddAddress(!showAddAddress)} variant="outline" size="sm">
                  {showAddAddress ? 'Cancel' : '+ Add New'}
                </Button>
              </div>

              {/* Address List */}
              {!showAddAddress && (
                <div className="space-y-3">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      onClick={() => setSelectedAddress(address.id)}
                      className={twMerge(
                        'border rounded-lg p-4 cursor-pointer transition-all',
                        selectedAddress === address.id
                          ? 'border-brand-900 dark:border-white bg-brand-50 dark:bg-brand-900'
                          : 'border-brand-200 dark:border-brand-700 hover:border-brand-400 dark:hover:border-brand-500'
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-brand-600 dark:text-brand-400 mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{address.name}</p>
                            {address.isDefault && (
                              <span className="text-xs px-2 py-0.5 bg-brand-100 dark:bg-brand-800 rounded">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-brand-600 dark:text-brand-400 mt-1">
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
                    </div>
                  ))}
                </div>
              )}

              {/* Add Address Form */}
              {showAddAddress && (
                <div className="border border-brand-200 dark:border-brand-700 rounded-lg p-6 space-y-4">
                  <h3 className="font-semibold">Add New Address</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      placeholder="John Doe"
                      value={newAddress.name || ''}
                      onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                    />
                    <Input
                      label="Phone Number"
                      placeholder="+91 98765 43210"
                      value={newAddress.phone || ''}
                      onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                    />
                  </div>
                  <Input
                    label="Street Address"
                    placeholder="123 Main Street, Apartment 4B"
                    value={newAddress.street || ''}
                    onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                  />
                  <div className="grid sm:grid-cols-3 gap-4">
                    <Input
                      label="City"
                      placeholder="Mumbai"
                      value={newAddress.city || ''}
                      onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                    />
                    <Input
                      label="State"
                      placeholder="Maharashtra"
                      value={newAddress.state || ''}
                      onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                    />
                    <Input
                      label="Pincode"
                      placeholder="400001"
                      value={newAddress.pincode || ''}
                      onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                    />
                  </div>
                  <Button onClick={handleAddAddress} fullWidth>
                    Save Address
                  </Button>
                </div>
              )}

              {/* Continue Button */}
              {selectedAddress && !showAddAddress && (
                <Button onClick={() => setStep('payment')} fullWidth size="lg">
                  Continue to Payment
                </Button>
              )}
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Payment Method</h2>

              <div className="space-y-3">
                {/* Razorpay */}
                <div
                  onClick={() => setPaymentMethod('razorpay')}
                  className={twMerge(
                    'border rounded-lg p-4 cursor-pointer transition-all',
                    paymentMethod === 'razorpay'
                      ? 'border-brand-900 dark:border-white bg-brand-50 dark:bg-brand-900'
                      : 'border-brand-200 dark:border-brand-700 hover:border-brand-400 dark:hover:border-brand-500'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-brand-600 dark:text-brand-400" />
                    <div className="flex-1">
                      <p className="font-medium">Credit/Debit Card, UPI, Netbanking</p>
                      <p className="text-sm text-brand-600 dark:text-brand-400">
                        Powered by Razorpay
                      </p>
                    </div>
                  </div>
                </div>

                {/* COD */}
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={twMerge(
                    'border rounded-lg p-4 cursor-pointer transition-all',
                    paymentMethod === 'cod'
                      ? 'border-brand-900 dark:border-white bg-brand-50 dark:bg-brand-900'
                      : 'border-brand-200 dark:border-brand-700 hover:border-brand-400 dark:hover:border-brand-500'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-6 h-6 text-brand-600 dark:text-brand-400" />
                    <div className="flex-1">
                      <p className="font-medium">Cash on Delivery</p>
                      <p className="text-sm text-brand-600 dark:text-brand-400">
                        Pay when you receive
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={() => setStep('address')} variant="outline" fullWidth>
                  Back
                </Button>
                <Button onClick={handlePayment} disabled={isProcessing} fullWidth size="lg">
                  {isProcessing ? 'Processing...' : `Pay ₹${total.toLocaleString('en-IN')}`}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 border border-brand-200 dark:border-brand-700 rounded-lg p-6 space-y-4">
            <h2 className="text-lg font-semibold">Order Summary</h2>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="w-16 h-20 bg-brand-100 dark:bg-brand-800 rounded overflow-hidden flex-shrink-0">
                    {item.imageUrl && (
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-2">{item.name}</p>
                    <p className="text-xs text-brand-600 dark:text-brand-400">
                      {item.size} | {item.color} | Qty: {item.quantity}
                    </p>
                    <p className="text-sm font-semibold mt-1">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-brand-200 dark:border-brand-700 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-brand-600 dark:text-brand-400">Subtotal</span>
                <span>₹{subtotal().toLocaleString('en-IN')}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600 dark:text-green-400">
                  <span>Discount ({couponCode})</span>
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
          </div>
        </div>
      </div>
    </div>
  );
}
