import { Link } from 'react-router-dom';

const lookbookItems = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1000&fit=crop',
    title: 'The Power Suit',
    subtitle: 'Tailored for confidence',
    href: '/collections/men-blazers',
    span: 'tall',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&h=600&fit=crop',
    title: 'Weekend Ease',
    subtitle: 'Relaxed fits, refined details',
    href: '/collections/women-tops',
    span: 'wide',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&h=600&fit=crop',
    title: 'Playful Layers',
    subtitle: 'For the young at heart',
    href: '/collections/kids-jackets',
    span: 'square',
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&h=800&fit=crop',
    title: 'Step Forward',
    subtitle: 'Footwear that moves with you',
    href: '/collections/shoes',
    span: 'tall',
  },
];

export function LookbookGrid() {
  return (
    <section className="py-12 sm:py-16 bg-brand-50 dark:bg-brand-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-500 dark:text-brand-400 mb-2">
            Editorial
          </p>
          <h2 className="text-3xl sm:text-4xl font-light" style={{ fontFamily: 'var(--font-serif)' }}>
            The Lookbook
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 auto-rows-[200px] sm:auto-rows-[250px] lg:auto-rows-[300px]">
          {lookbookItems.map((item) => (
            <Link
              key={item.id}
              to={item.href}
              className={`group relative overflow-hidden rounded ${
                item.span === 'tall' ? 'row-span-2' : ''
              } ${item.span === 'wide' ? 'col-span-2 lg:col-span-2' : ''}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                <p className="text-[10px] sm:text-xs uppercase tracking-wider opacity-80 mb-1">
                  {item.subtitle}
                </p>
                <h3 className="text-base sm:text-lg font-medium" style={{ fontFamily: 'var(--font-serif)' }}>
                  {item.title}
                </h3>
                <p className="text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  Shop Now →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
