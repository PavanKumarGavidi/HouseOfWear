import { Link, useLocation } from 'react-router-dom';
import { Home, Grid3x3, Search, Heart, User } from 'lucide-react';
import { twMerge } from '../../utils/cn';
import { useCartStore, useWishlistStore } from '../../stores';

export function BottomTabBar() {
  const location = useLocation();
  const wishlistCount = useWishlistStore((state) => state.items.length);

  const tabs = [
    { label: 'Home', icon: Home, href: '/' },
    { label: 'Categories', icon: Grid3x3, href: '/collections' },
    { label: 'Search', icon: Search, href: '/search' },
    { label: 'Wishlist', icon: Heart, href: '/wishlist', badge: wishlistCount },
    { label: 'Account', icon: User, href: '/account' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-brand-950/95 backdrop-blur-md border-t border-brand-100 dark:border-brand-800 lg:hidden safe-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.href;
          const Icon = tab.icon;

          return (
            <Link
              key={tab.href}
              to={tab.href}
              className={twMerge(
                'flex flex-col items-center justify-center gap-0.5 flex-1 py-2 transition-colors relative',
                isActive ? 'text-brand-950 dark:text-white' : 'text-brand-500 dark:text-brand-400'
              )}
            >
              <div className="relative">
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 1.5} />
                {tab.badge && tab.badge > 0 ? (
                  <span className="absolute -top-1.5 -right-2.5 w-4 h-4 bg-error text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {tab.badge > 9 ? '9+' : tab.badge}
                  </span>
                ) : null}
              </div>
              <span className="text-[10px] font-medium tracking-wide">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
