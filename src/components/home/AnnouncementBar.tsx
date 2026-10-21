import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { twMerge } from '../../utils/cn';

const announcements = [
  'FREE SHIPPING ON ORDERS ABOVE ₹999',
  'NEW IN EVERY WEEK — SHOP LATEST DROPS',
  'EXTRA 10% OFF ON PREPAID ORDERS — USE CODE: PREPAID10',
  'EARN LOYALTY POINTS ON EVERY PURCHASE',
];

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="bg-brand-950 dark:bg-white text-white dark:text-brand-950 relative">
      <div className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-9 relative">
          <p className="text-[11px] uppercase tracking-[0.2em] font-medium transition-opacity duration-500">
            {announcements[currentIndex]}
          </p>
          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-0 p-1 hover:opacity-70 transition-opacity"
            aria-label="Close announcement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
