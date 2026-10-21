import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, X, Moon, Sun } from 'lucide-react';
import { Drawer } from '../ui/Drawer';
import { useUIStore } from '../../stores';
import { useState } from 'react';
import { twMerge } from '../../utils/cn';

// Accordion menu item
function AccordionItem({
  label,
  href,
  children,
}: {
  label: string;
  href: string;
  children?: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = !!children;

  return (
    <div className="border-b border-brand-100 dark:border-brand-800">
      <div className="flex items-center">
        <Link
          to={href}
          className="flex-1 py-3.5 text-sm font-medium uppercase tracking-wider"
        >
          {label}
        </Link>
        {hasChildren && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-3.5"
            aria-label={isOpen ? 'Collapse' : 'Expand'}
          >
            <ChevronDown
              className={twMerge(
                'w-4 h-4 transition-transform',
                isOpen && 'rotate-180'
              )}
            />
          </button>
        )}
      </div>
      {hasChildren && isOpen && (
        <div className="pb-3 pl-4 space-y-0">
          {children}
        </div>
      )}
    </div>
  );
}

function SubLink({ label, href }: { label: string; href: string }) {
  return (
    <Link
      to={href}
      className="block py-2 text-sm text-brand-600 dark:text-brand-400 hover:text-brand-950 dark:hover:text-white transition-colors"
    >
      {label}
    </Link>
  );
}

export function MobileDrawer() {
  const { mobileMenuOpen, setMobileMenuOpen, darkMode, toggleDarkMode } = useUIStore();

  const close = () => setMobileMenuOpen(false);

  return (
    <Drawer
      isOpen={mobileMenuOpen}
      onClose={close}
      position="left"
      className="max-w-sm"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-14 border-b border-brand-100 dark:border-brand-800 flex-shrink-0">
          <Link to="/" onClick={close} className="flex items-center gap-2">
            <div className="w-7 h-7 bg-brand-950 dark:bg-white rounded-sm flex items-center justify-center">
              <span className="text-white dark:text-brand-950 font-bold text-[10px] tracking-tighter">H</span>
            </div>
            <span className="text-sm font-semibold tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>
              House Of Wear
            </span>
          </Link>
          <button
            onClick={close}
            className="p-2 -mr-2 hover:bg-brand-100 dark:hover:bg-brand-800 rounded transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4">
          {/* MEN */}
          <AccordionItem label="Men" href="/collections/men">
            <SubLink label="New In" href="/collections/men/new-arrivals" />
            <SubLink label="Shirts" href="/collections/men-shirts" />
            <SubLink label="T-Shirts" href="/collections/men-t-shirts" />
            <SubLink label="Trousers" href="/collections/men-trousers" />
            <SubLink label="Jeans" href="/collections/men-jeans" />
            <SubLink label="Jackets" href="/collections/men-jackets" />
            <SubLink label="Blazers" href="/collections/men-blazers" />
            <SubLink label="Hoodies" href="/collections/men-hoodies" />
            <SubLink label="Sale" href="/collections/men/sale" />
          </AccordionItem>

          {/* WOMEN */}
          <AccordionItem label="Women" href="/collections/women">
            <SubLink label="New In" href="/collections/women/new-arrivals" />
            <SubLink label="Dresses" href="/collections/women-dresses" />
            <SubLink label="Tops" href="/collections/women-tops" />
            <SubLink label="Trousers" href="/collections/women-trousers" />
            <SubLink label="Jeans" href="/collections/women-jeans" />
            <SubLink label="Blazers" href="/collections/women-blazers" />
            <SubLink label="Co-ords" href="/collections/women-co-ords" />
            <SubLink label="Sale" href="/collections/women/sale" />
          </AccordionItem>

          {/* KIDS */}
          <AccordionItem label="Kids" href="/collections/kids">
            <SubLink label="New In" href="/collections/kids/new-arrivals" />
            <SubLink label="T-Shirts" href="/collections/kids-t-shirts" />
            <SubLink label="Jeans" href="/collections/kids-jeans" />
            <SubLink label="Dresses" href="/collections/kids-dresses" />
            <SubLink label="Jackets" href="/collections/kids-jackets" />
            <SubLink label="Sale" href="/collections/kids/sale" />
          </AccordionItem>

          {/* SHOES */}
          <AccordionItem label="Shoes" href="/collections/shoes">
            <SubLink label="Men's Shoes" href="/collections/shoes/mens-shoes" />
            <SubLink label="Women's Shoes" href="/collections/shoes/womens-shoes" />
            <SubLink label="Bestsellers" href="/collections/shoes/bestsellers" />
            <SubLink label="Sale" href="/collections/shoes/sale" />
          </AccordionItem>

          {/* Other Links */}
          <div className="pt-4 space-y-0">
            <Link
              to="/search"
              onClick={close}
              className="flex items-center justify-between py-3.5 text-sm font-medium uppercase tracking-wider border-b border-brand-100 dark:border-brand-800"
            >
              Search
              <ChevronRight className="w-4 h-4 text-brand-400" />
            </Link>
            <Link
              to="/account"
              onClick={close}
              className="flex items-center justify-between py-3.5 text-sm font-medium uppercase tracking-wider border-b border-brand-100 dark:border-brand-800"
            >
              My Account
              <ChevronRight className="w-4 h-4 text-brand-400" />
            </Link>
            <Link
              to="/wishlist"
              onClick={close}
              className="flex items-center justify-between py-3.5 text-sm font-medium uppercase tracking-wider border-b border-brand-100 dark:border-brand-800"
            >
              Wishlist
              <ChevronRight className="w-4 h-4 text-brand-400" />
            </Link>
          </div>
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-brand-100 dark:border-brand-800 flex items-center justify-between">
          <button
            onClick={toggleDarkMode}
            className="flex items-center gap-2 text-sm text-brand-600 dark:text-brand-400"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <span className="text-xs text-brand-400">v1.0</span>
        </div>
      </div>
    </Drawer>
  );
}
