import { useState } from 'react';
import { Gift, CreditCard, Check, Copy } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { twMerge } from '../utils/cn';

type GiftCardView = 'buy' | 'redeem';

interface GiftCardAmount {
  value: number;
  label: string;
}

const giftCardAmounts: GiftCardAmount[] = [
  { value: 500, label: '₹500' },
  { value: 1000, label: '₹1,000' },
  { value: 2000, label: '₹2,000' },
  { value: 5000, label: '₹5,000' },
  { value: 10000, label: '₹10,000' },
  { value: 20000, label: '₹20,000' },
];

export function GiftCardsPage() {
  const [view, setView] = useState<GiftCardView>('buy');
  const [selectedAmount, setSelectedAmount] = useState<number>(2000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [message, setMessage] = useState('');
  const [redeemCode, setRedeemCode] = useState('');
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [redeemSuccess, setRedeemSuccess] = useState(false);
  const [redeemBalance, setRedeemBalance] = useState(0);
  const [copied, setCopied] = useState(false);

  const handlePurchase = () => {
    // Mock gift card generation
    const code = `HOW-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${selectedAmount}`;
    setGeneratedCode(code);
    setPurchaseSuccess(true);
  };

  const handleRedeem = () => {
    // Mock redemption
    if (redeemCode.length > 0) {
      setRedeemSuccess(true);
      setRedeemBalance(2000); // Mock balance
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-100 dark:bg-accent-900/30 mb-4">
          <Gift className="w-8 h-8 text-accent-600 dark:text-accent-400" />
        </div>
        <h1 className="text-3xl font-light mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
          Gift Cards
        </h1>
        <p className="text-brand-600 dark:text-brand-400">
          The perfect gift for any occasion
        </p>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2 mb-8 justify-center">
        <button
          onClick={() => setView('buy')}
          className={twMerge(
            'px-6 py-2 rounded-full text-sm font-medium transition-colors',
            view === 'buy'
              ? 'bg-brand-900 dark:bg-white text-white dark:text-brand-900'
              : 'bg-brand-100 dark:bg-brand-800 text-brand-700 dark:text-brand-300'
          )}
        >
          Buy Gift Card
        </button>
        <button
          onClick={() => setView('redeem')}
          className={twMerge(
            'px-6 py-2 rounded-full text-sm font-medium transition-colors',
            view === 'redeem'
              ? 'bg-brand-900 dark:bg-white text-white dark:text-brand-900'
              : 'bg-brand-100 dark:bg-brand-800 text-brand-700 dark:text-brand-300'
          )}
        >
          Redeem Gift Card
        </button>
      </div>

      {/* Buy Gift Card */}
      {view === 'buy' && !purchaseSuccess && (
        <div className="border border-brand-200 dark:border-brand-700 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Choose Amount</h2>

          {/* Amount Selection */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            {giftCardAmounts.map((amount) => (
              <button
                key={amount.value}
                onClick={() => {
                  setSelectedAmount(amount.value);
                  setCustomAmount('');
                }}
                className={twMerge(
                  'py-4 rounded-lg border-2 transition-all',
                  selectedAmount === amount.value && !customAmount
                    ? 'border-brand-900 dark:border-white bg-brand-50 dark:bg-brand-900'
                    : 'border-brand-200 dark:border-brand-700 hover:border-brand-400 dark:hover:border-brand-500'
                )}
              >
                <span className="text-lg font-semibold">{amount.label}</span>
              </button>
            ))}
          </div>

          {/* Custom Amount */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Or enter custom amount</label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                if (e.target.value) setSelectedAmount(Number(e.target.value));
              }}
              leftIcon={<span className="text-sm font-medium">₹</span>}
            />
          </div>

          {/* Recipient Details */}
          <div className="space-y-4 mb-6">
            <Input
              label="Recipient Name"
              placeholder="Enter recipient's name"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
            />
            <Input
              label="Recipient Email"
              type="email"
              placeholder="recipient@example.com"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
            />
            <div>
              <label className="block text-sm font-medium mb-2">
                Personal Message (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Add a personal message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 border border-brand-200 dark:border-brand-700 rounded-lg bg-white dark:bg-brand-900"
              />
            </div>
          </div>

          {/* Summary */}
          <div className="border-t border-brand-200 dark:border-brand-700 pt-4 mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Gift Card Amount</span>
              <span className="font-semibold">₹{selectedAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>₹{selectedAmount.toLocaleString()}</span>
            </div>
          </div>

          <Button onClick={handlePurchase} fullWidth size="lg">
            Purchase Gift Card
          </Button>
        </div>
      )}

      {/* Purchase Success */}
      {purchaseSuccess && (
        <div className="border border-green-200 dark:border-green-800 rounded-lg p-6 bg-green-50 dark:bg-green-900/20">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
              <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Gift Card Purchased!</h2>
            <p className="text-brand-600 dark:text-brand-400">
              The gift card has been sent to {recipientEmail || 'your email'}
            </p>
          </div>

          {/* Gift Card Code */}
          <div className="bg-white dark:bg-brand-900 rounded-lg p-6 mb-6">
            <p className="text-sm text-brand-600 dark:text-brand-400 mb-2">Gift Card Code</p>
            <div className="flex items-center justify-between gap-3">
              <code className="text-2xl font-mono font-bold text-brand-900 dark:text-white">
                {generatedCode}
              </code>
              <button
                onClick={handleCopyCode}
                className="p-2 hover:bg-brand-100 dark:hover:bg-brand-800 rounded transition-colors"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-green-600" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>
            <p className="text-sm text-brand-600 dark:text-brand-400 mt-3">
              Amount: ₹{selectedAmount.toLocaleString()}
            </p>
          </div>

          <Button onClick={() => { setPurchaseSuccess(false); setView('buy'); }} variant="outline" fullWidth>
            Buy Another Gift Card
          </Button>
        </div>
      )}

      {/* Redeem Gift Card */}
      {view === 'redeem' && !redeemSuccess && (
        <div className="border border-brand-200 dark:border-brand-700 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Redeem Your Gift Card</h2>

          <div className="mb-6">
            <Input
              label="Gift Card Code"
              placeholder="Enter your gift card code"
              value={redeemCode}
              onChange={(e) => setRedeemCode(e.target.value.toUpperCase())}
            />
          </div>

          <div className="bg-brand-50 dark:bg-brand-900 rounded-lg p-4 mb-6">
            <p className="text-sm text-brand-700 dark:text-brand-300">
              <strong>How to redeem:</strong> Enter your gift card code above and the balance will be added to your account. You can use this balance for future purchases.
            </p>
          </div>

          <Button onClick={handleRedeem} fullWidth size="lg" disabled={!redeemCode}>
            Redeem Gift Card
          </Button>
        </div>
      )}

      {/* Redeem Success */}
      {redeemSuccess && (
        <div className="border border-green-200 dark:border-green-800 rounded-lg p-6 bg-green-50 dark:bg-green-900/20">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
              <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Gift Card Redeemed!</h2>
            <p className="text-brand-600 dark:text-brand-400">
              ₹{redeemBalance.toLocaleString()} has been added to your account
            </p>
          </div>

          <div className="bg-white dark:bg-brand-900 rounded-lg p-6 mb-6 text-center">
            <p className="text-sm text-brand-600 dark:text-brand-400 mb-2">Your Balance</p>
            <p className="text-4xl font-bold text-brand-900 dark:text-white">
              ₹{redeemBalance.toLocaleString()}
            </p>
          </div>

          <Button onClick={() => window.location.href = '/collections/new-arrivals'} fullWidth size="lg">
            Start Shopping
          </Button>
        </div>
      )}

      {/* Gift Card Features */}
      <div className="grid sm:grid-cols-3 gap-6 mt-12">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-100 dark:bg-brand-800 mb-3">
            <Gift className="w-6 h-6 text-brand-700 dark:text-brand-300" />
          </div>
          <h3 className="font-semibold mb-1">Perfect Gift</h3>
          <p className="text-sm text-brand-600 dark:text-brand-400">
            Let them choose what they love
          </p>
        </div>
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-100 dark:bg-brand-800 mb-3">
            <CreditCard className="w-6 h-6 text-brand-700 dark:text-brand-300" />
          </div>
          <h3 className="font-semibold mb-1">Easy to Use</h3>
          <p className="text-sm text-brand-600 dark:text-brand-400">
            Redeem online in seconds
          </p>
        </div>
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-100 dark:bg-brand-800 mb-3">
            <Check className="w-6 h-6 text-brand-700 dark:text-brand-300" />
          </div>
          <h3 className="font-semibold mb-1">No Expiry</h3>
          <p className="text-sm text-brand-600 dark:text-brand-400">
            Use it anytime, no rush
          </p>
        </div>
      </div>
    </div>
  );
}
