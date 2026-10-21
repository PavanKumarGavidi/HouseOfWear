import { useState } from 'react';
import { Tag, X, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { twMerge } from '../../utils/cn';

interface CouponInputProps {
  onApply: (code: string) => Promise<{ success: boolean; discount: number; message: string }>;
  onRemove: () => void;
  appliedCoupon: string | null;
  discount: number;
}

export function CouponInput({ onApply, onRemove, appliedCoupon, discount }: CouponInputProps) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isExpanded, setIsExpanded] = useState(!appliedCoupon);

  const handleApply = async () => {
    if (!code.trim()) {
      setError('Please enter a coupon code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await onApply(code.trim().toUpperCase());
      if (result.success) {
        setCode('');
        setIsExpanded(false);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Failed to apply coupon');
    } finally {
      setLoading(false);
    }
  };

  if (appliedCoupon) {
    return (
      <div className="border border-green-200 dark:border-green-800 rounded-lg p-4 bg-green-50 dark:bg-green-900/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
            <div>
              <p className="text-sm font-medium text-green-900 dark:text-green-100">
                Coupon Applied: <span className="font-bold">{appliedCoupon}</span>
              </p>
              <p className="text-xs text-green-700 dark:text-green-300">
                You saved ₹{discount.toLocaleString('en-IN')}
              </p>
            </div>
          </div>
          <button
            onClick={onRemove}
            className="p-1 hover:bg-green-100 dark:hover:bg-green-800 rounded transition-colors"
            aria-label="Remove coupon"
          >
            <X className="w-4 h-4 text-green-600 dark:text-green-400" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-brand-200 dark:border-brand-700 rounded-lg p-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 w-full text-left"
      >
        <Tag className="w-4 h-4 text-brand-600 dark:text-brand-400" />
        <span className="text-sm font-medium">
          {isExpanded ? 'Have a coupon code?' : 'Apply Coupon Code'}
        </span>
      </button>

      {isExpanded && (
        <div className="mt-3 space-y-2">
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter coupon code"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value.toUpperCase());
                  setError('');
                }}
                error={error}
              />
            </div>
            <Button onClick={handleApply} disabled={loading || !code.trim()}>
              {loading ? 'Applying...' : 'Apply'}
            </Button>
          </div>
          <p className="text-xs text-brand-500 dark:text-brand-400">
            Try: WELCOME10, SUMMER14, FLAT500
          </p>
        </div>
      )}
    </div>
  );
}
