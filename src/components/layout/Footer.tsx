import { Link } from 'react-router-dom';

const footerSections = [
  {
    title: 'Shop',
    links: [
      { label: 'Men', href: '/collections/men' },
      { label: 'Women', href: '/collections/women' },
      { label: 'Kids', href: '/collections/kids' },
      { label: 'Shoes', href: '/collections/shoes' },
      { label: 'New Arrivals', href: '/collections/new-arrivals' },
      { label: 'Sale', href: '/collections/sale' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'FAQ', href: '/help' },
      { label: 'Shipping', href: '/help/shipping' },
      { label: 'Returns & Exchange', href: '/help/returns' },
      { label: 'Size Guide', href: '/help/size-guide' },
      { label: 'Track Order', href: '/track-order' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Store Locator', href: '/stores' },
      { label: 'Blog', href: '/blog' },
      { label: 'Gift Cards', href: '/gift-cards' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-brand-50 dark:bg-brand-900 border-t border-brand-100 dark:border-brand-800">
      {/* Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-brand-200 dark:border-brand-800">
        <div className="max-w-xl mx-auto text-center">
          <h3 className="text-lg font-medium mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
            Join the House
          </h3>
          <p className="text-sm text-brand-600 dark:text-brand-400 mb-4">
            Subscribe for exclusive drops, style guides, and 10% off your first order.
          </p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-11 px-4 rounded border border-brand-200 dark:border-brand-700 bg-white dark:bg-brand-950 text-sm focus:outline-none focus:border-brand-950 dark:focus:border-white"
            />
            <button
              type="submit"
              className="h-11 px-6 bg-brand-950 dark:bg-white text-white dark:text-brand-950 text-xs uppercase tracking-wider font-medium rounded hover:bg-brand-800 dark:hover:bg-brand-100 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-brand-600 dark:text-brand-400 hover:text-brand-950 dark:hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-brand-200 dark:border-brand-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-brand-950 dark:bg-white rounded-sm flex items-center justify-center">
              <span className="text-white dark:text-brand-950 font-bold text-[8px] tracking-tighter">H</span>
            </div>
            <span className="text-xs text-brand-600 dark:text-brand-400">
              © 2024 House Of Wear. All rights reserved.
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-xs text-brand-500">
              🇮🇳 India (₹ INR)
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-brand-500">Secure Payments</span>
              <span className="text-xs">💳</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
