import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface MegaMenuProps {
  section: string;
  onClose: () => void;
}

// Navigation structure per section
const navStructure: Record<string, { title: string; links: { label: string; href: string }[] }[]> = {
  men: [
    {
      title: 'New & Featured',
      links: [
        { label: 'New In', href: '/collections/men/new-arrivals' },
        { label: 'Bestsellers', href: '/collections/men/bestsellers' },
        { label: 'The Edit', href: '/collections/men/the-edit' },
        { label: 'Shop The Look', href: '/collections/men/shop-the-look' },
      ],
    },
    {
      title: 'Clothing',
      links: [
        { label: 'Shirts', href: '/collections/men-shirts' },
        { label: 'Formal Shirts', href: '/collections/men-formal-shirts' },
        { label: 'T-Shirts', href: '/collections/men-t-shirts' },
        { label: 'Polos', href: '/collections/men-polos' },
        { label: 'Trousers', href: '/collections/men-trousers' },
        { label: 'Jeans', href: '/collections/men-jeans' },
        { label: 'Shorts', href: '/collections/men-shorts' },
        { label: 'Jackets', href: '/collections/men-jackets' },
        { label: 'Blazers', href: '/collections/men-blazers' },
        { label: 'Hoodies', href: '/collections/men-hoodies' },
      ],
    },
    {
      title: 'Work & Formal',
      links: [
        { label: 'Work/Business', href: '/collections/men/work' },
        { label: 'Suits', href: '/collections/men-suits' },
        { label: 'Formal Shirts', href: '/collections/men-formal-shirts' },
        { label: 'Blazers', href: '/collections/men-blazers' },
      ],
    },
    {
      title: 'Accessories',
      links: [
        { label: 'Belts', href: '/collections/men/belts' },
        { label: 'Wallets', href: '/collections/men/wallets' },
        { label: 'Socks', href: '/collections/men/socks' },
        { label: 'Bags & Backpacks', href: '/collections/men/bags' },
      ],
    },
  ],
  women: [
    {
      title: 'New & Featured',
      links: [
        { label: 'New In', href: '/collections/women/new-arrivals' },
        { label: 'Bestsellers', href: '/collections/women/bestsellers' },
        { label: 'The Edit', href: '/collections/women/the-edit' },
        { label: 'Collaborations', href: '/collections/women/collaborations' },
      ],
    },
    {
      title: 'Clothing',
      links: [
        { label: 'Dresses', href: '/collections/women-dresses' },
        { label: 'Tops', href: '/collections/women-tops' },
        { label: 'T-Shirts', href: '/collections/women-t-shirts' },
        { label: 'Trousers', href: '/collections/women-trousers' },
        { label: 'Jeans', href: '/collections/women-jeans' },
        { label: 'Skirts', href: '/collections/women-skirts' },
        { label: 'Blazers', href: '/collections/women-blazers' },
        { label: 'Co-ords', href: '/collections/women-co-ords' },
        { label: 'Jackets', href: '/collections/women-jackets' },
        { label: 'Sweaters', href: '/collections/women-sweaters' },
      ],
    },
    {
      title: 'Workwear',
      links: [
        { label: 'Work Essentials', href: '/collections/women/work' },
        { label: 'Blazers', href: '/collections/women-blazers' },
        { label: 'Trousers', href: '/collections/women-trousers' },
        { label: 'Shirts', href: '/collections/women-shirts' },
      ],
    },
    {
      title: 'Accessories',
      links: [
        { label: 'Bags', href: '/collections/women/bags' },
        { label: 'Jewellery', href: '/collections/women/jewellery' },
        { label: 'Scarves', href: '/collections/women/scarves' },
        { label: 'Belts', href: '/collections/women/belts' },
      ],
    },
  ],
  kids: [
    {
      title: 'New & Featured',
      links: [
        { label: 'New In', href: '/collections/kids/new-arrivals' },
        { label: 'Bestsellers', href: '/collections/kids/bestsellers' },
        { label: 'The Edit', href: '/collections/kids/the-edit' },
        { label: 'Shop The Look', href: '/collections/kids/shop-the-look' },
      ],
    },
    {
      title: 'Clothing',
      links: [
        { label: 'T-Shirts', href: '/collections/kids-t-shirts' },
        { label: 'Shirts', href: '/collections/kids-shirts' },
        { label: 'Jeans', href: '/collections/kids-jeans' },
        { label: 'Dresses', href: '/collections/kids-dresses' },
        { label: 'Shorts', href: '/collections/kids-shorts' },
        { label: 'Jackets', href: '/collections/kids-jackets' },
      ],
    },
    {
      title: 'Shoes & Accessories',
      links: [
        { label: 'Sneakers', href: '/collections/kids/sneakers' },
        { label: 'Socks', href: '/collections/kids/socks' },
        { label: 'Backpacks', href: '/collections/kids/backpacks' },
        { label: 'Caps', href: '/collections/kids/caps' },
      ],
    },
  ],
  shoes: [
    {
      title: "Men's Shoes",
      links: [
        { label: 'Sneakers', href: '/collections/shoes/men-sneakers' },
        { label: 'Formals', href: '/collections/shoes/men-formals' },
        { label: 'Loafers', href: '/collections/shoes/men-loafers' },
        { label: 'Boots', href: '/collections/shoes/men-boots' },
        { label: 'Sandals', href: '/collections/shoes/men-sandals' },
      ],
    },
    {
      title: "Women's Shoes",
      links: [
        { label: 'Sneakers', href: '/collections/shoes/women-sneakers' },
        { label: 'Heels', href: '/collections/shoes/women-heels' },
        { label: 'Flats', href: '/collections/shoes/women-flats' },
        { label: 'Sandals', href: '/collections/shoes/women-sandals' },
        { label: 'Boots', href: '/collections/shoes/women-boots' },
      ],
    },
    {
      title: 'Featured',
      links: [
        { label: 'Bestsellers', href: '/collections/shoes/bestsellers' },
        { label: 'New In', href: '/collections/shoes/new-arrivals' },
        { label: 'Sale', href: '/collections/shoes/sale' },
      ],
    },
  ],
};

export function MegaMenu({ section, onClose }: MegaMenuProps) {
  const columns = navStructure[section] || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute left-0 right-0 top-full bg-white dark:bg-brand-950 border-b border-brand-100 dark:border-brand-800 shadow-lg z-50"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-8">
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-500 dark:text-brand-400 mb-3">
                {column.title}
              </h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-brand-700 dark:text-brand-300 hover:text-brand-950 dark:hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Promo Tile */}
          <div className="hidden lg:block">
            <Link
              to={`/collections/${section}/sale`}
              className="block aspect-[4/5] rounded bg-brand-100 dark:bg-brand-800 overflow-hidden group"
            >
              <div className="absolute inset-0 flex items-end p-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-brand-600 dark:text-brand-400">Up to</p>
                  <p className="text-2xl font-light" style={{ fontFamily: 'var(--font-serif)' }}>50% Off</p>
                  <p className="text-xs mt-1 underline">Shop Sale →</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
