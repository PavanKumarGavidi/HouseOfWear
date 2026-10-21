import { Link } from 'react-router-dom';

interface LookItem {
  id: string;
  image: string;
  products: {
    name: string;
    price: number;
    href: string;
    x: number; // percentage from left
    y: number; // percentage from top
  }[];
}

const looks: LookItem[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop',
    products: [
      { name: 'Oxford Shirt', price: 2499, href: '/products/oxford-classic-white-shirt', x: 30, y: 35 },
      { name: 'Chino Trousers', price: 2799, href: '/products/tailored-chino-trousers', x: 40, y: 65 },
      { name: 'Leather Sneakers', price: 4999, href: '/products/minimal-leather-sneakers', x: 35, y: 90 },
    ],
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&h=1000&fit=crop',
    products: [
      { name: 'Silk Blouse', price: 3999, href: '/products/silk-blouse-ivory', x: 45, y: 30 },
      { name: 'Palazzo Pants', price: 2499, href: '/products/wide-leg-palazzo-pants', x: 50, y: 60 },
      { name: 'Block Heel Mules', price: 3499, href: '/products/block-heel-mules', x: 45, y: 88 },
    ],
  },
];

export function ShopTheLook() {
  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-500 dark:text-brand-400 mb-2">
            Style Inspiration
          </p>
          <h2 className="text-3xl sm:text-4xl font-light" style={{ fontFamily: 'var(--font-serif)' }}>
            Shop The Look
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {looks.map((look) => (
            <div key={look.id} className="relative group">
              <div className="aspect-[4/5] rounded overflow-hidden bg-brand-100 dark:bg-brand-800">
                <img
                  src={look.image}
                  alt="Look"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Hotspots */}
              {look.products.map((product, i) => (
                <Link
                  key={i}
                  to={product.href}
                  className="absolute group/hotspot"
                  style={{ left: `${product.x}%`, top: `${product.y}%` }}
                >
                  <div className="relative">
                    <div className="w-6 h-6 rounded-full bg-white dark:bg-brand-950 border-2 border-brand-950 dark:border-white flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                      <span className="text-[10px] font-bold">{i + 1}</span>
                    </div>
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/hotspot:opacity-100 transition-opacity pointer-events-none">
                      <div className="bg-white dark:bg-brand-900 rounded shadow-lg px-3 py-2 whitespace-nowrap">
                        <p className="text-xs font-medium">{product.name}</p>
                        <p className="text-xs text-brand-500">₹{product.price.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
