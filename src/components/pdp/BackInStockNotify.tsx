import { useState } from 'react';
import { Bell, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface BackInStockNotifyProps {
  productName: string;
  variantId: string;
}

export function BackInStockNotify({ productName, variantId }: BackInStockNotifyProps) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notifyMethod, setNotifyMethod] = useState<'email' | 'sms'>('email');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 800));
    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="border border-green-200 dark:border-green-800 rounded-lg p-4 bg-green-50 dark:bg-green-900/20">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30">
            <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="font-medium text-green-900 dark:text-green-100">
              You're on the list!
            </h3>
            <p className="text-sm text-green-700 dark:text-green-300 mt-1">
              We'll notify you when {productName} is back in stock.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-brand-200 dark:border-brand-700 rounded-lg p-4">
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 rounded-full bg-brand-100 dark:bg-brand-800">
          <Bell className="w-5 h-5 text-brand-700 dark:text-brand-300" />
        </div>
        <div>
          <h3 className="font-medium">Notify Me When Available</h3>
          <p className="text-sm text-brand-600 dark:text-brand-400 mt-1">
            Get notified when this item is back in stock
          </p>
        </div>
      </div>

      {/* Notification Method */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setNotifyMethod('email')}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
            notifyMethod === 'email'
              ? 'bg-brand-900 dark:bg-white text-white dark:text-brand-900'
              : 'bg-brand-100 dark:bg-brand-800 text-brand-700 dark:text-brand-300'
          }`}
        >
          Email
        </button>
        <button
          onClick={() => setNotifyMethod('sms')}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
            notifyMethod === 'sms'
              ? 'bg-brand-900 dark:bg-white text-white dark:text-brand-900'
              : 'bg-brand-100 dark:bg-brand-800 text-brand-700 dark:text-brand-300'
          }`}
        >
          SMS
        </button>
      </div>

      {/* Input */}
      {notifyMethod === 'email' ? (
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      ) : (
        <Input
          type="tel"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          leftIcon={<span className="text-sm font-medium">+91</span>}
        />
      )}

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        loading={loading}
        disabled={notifyMethod === 'email' ? !email : !phone}
        fullWidth
        className="mt-3"
      >
        Notify Me
      </Button>
    </div>
  );
}
