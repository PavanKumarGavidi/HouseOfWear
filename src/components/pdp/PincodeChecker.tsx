import { useState } from 'react';
import { MapPin, Truck, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface PincodeCheckerProps {
  onCheck: (pincode: string) => Promise<{
    serviceable: boolean;
    deliveryDays: number;
    codAvailable: boolean;
  } | null>;
}

export function PincodeChecker({ onCheck }: PincodeCheckerProps) {
  const [pincode, setPincode] = useState('');
  const [result, setResult] = useState<{
    serviceable: boolean;
    deliveryDays: number;
    codAvailable: boolean;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheck = async () => {
    if (!pincode || pincode.length !== 6) {
      setError('Please enter a valid 6-digit pincode');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await onCheck(pincode);
      setResult(data);
    } catch (err) {
      setError('Failed to check delivery availability');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setPincode(value);
    setError('');
  };

  return (
    <div className="border border-brand-200 dark:border-brand-700 rounded-lg p-4 space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium">
        <MapPin className="w-4 h-4" />
        <span>Check Delivery Availability</span>
      </div>

      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Enter pincode"
            value={pincode}
            onChange={handleChange}
            error={error}
          />
        </div>
        <Button onClick={handleCheck} disabled={loading || pincode.length !== 6}>
          {loading ? 'Checking...' : 'Check'}
        </Button>
      </div>

      {result && (
        <div className="space-y-2 pt-2">
          {result.serviceable ? (
            <>
              <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                <Check className="w-4 h-4" />
                <span>Delivery available to this pincode</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-brand-700 dark:text-brand-300">
                <Truck className="w-4 h-4" />
                <span>
                  Estimated delivery: <strong>{result.deliveryDays} days</strong>
                </span>
              </div>
              {result.codAvailable && (
                <div className="text-xs text-brand-600 dark:text-brand-400">
                  ✓ Cash on Delivery available
                </div>
              )}
            </>
          ) : (
            <div className="text-sm text-red-600 dark:text-red-400">
              Sorry, delivery is not available to this pincode
            </div>
          )}
        </div>
      )}
    </div>
  );
}
