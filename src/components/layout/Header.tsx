import { Link } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, Menu, Moon, Sun } from 'lucide-react';
import { twMerge } from '../../utils/cn';
import { useUIStore, useCartStore, useWishlistStore } from '../../stores';
import { useScrollDirection } from '../../hooks';
import { MegaMenu } from './MegaMenu';
import { useState } from 'react';

export function Header() {
  const scrollDirection = useScrollDirection();
  const { darkMode, toggleDarkMode, setMobileMenuOpen, setCartDrawerOpen } = useUIStore();
  const totalItems = useCartStore((state) => state.totalItems());
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const isHidden = scrollDirection === 'down' && !activeMenu;

  const navItems = [
    { label: 'Men', href: '/collections/men', key: 'men' },
    { label: 'Women', href: '/collections/women', key: 'women' },
    { label: 'Kids', href: '/collections/kids', key: 'kids' },
    { label: 'Shoes', href: '/collections/shoes', key: 'shoes' },
  ];

  return (
    <>
      <header
        className={twMerge(
          'sticky top-0 z-40 transition-transform duration-300',
          'bg-white/95 dark:bg-brand-950/95 backdrop-blur-md',
          'border-b border-brand-100 dark:border-brand-800',
          isHidden && '-translate-y-full'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 hover:bg-brand-100 dark:hover:bg-brand-800 rounded transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-950 dark:bg-white rounded-sm flex items-center justify-center">
                <span className="text-white dark:text-brand-950 font-bold text-xs tracking-tighter">H</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>
                  House Of Wear
                </h1>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <div
                  key={item.key}
                  onMouseEnter={() => setActiveMenu(item.key)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <Link
                    to={item.href}
                    className="text-xs uppercase tracking-[0.15em] font-medium hover:text-brand-600 dark:hover:text-brand-400 transition-colors py-6"
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Search */}
              <button
                className="p-2 hover:bg-brand-100 dark:hover:bg-brand-800 rounded transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="hidden sm:flex p-2 hover:bg-brand-100 dark:hover:bg-brand-800 rounded transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Account */}
              <Link
                to="/account"
                className="hidden sm:flex p-2 hover:bg-brand-100 dark:hover:bg-brand-800 rounded transition-colors"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative p-2 hover:bg-brand-100 dark:hover:bg-brand-800 rounded transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-error text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button
                onClick={() => setCartDrawerOpen(true)}
                className="relative p-2 hover:bg-brand-100 dark:hover:bg-brand-800 rounded transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-brand-950 dark:bg-white text-white dark:text-brand-950 text-[10px] font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu */}
        {activeMenu && (
          <MegaMenu section={activeMenu} onClose={() => setActiveMenu(null)} />
        )}
      </header>
    </>
  );
}
