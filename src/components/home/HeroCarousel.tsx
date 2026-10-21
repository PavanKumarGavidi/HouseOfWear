import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface HeroSlide {
  id: string;
  image: string;
  mobileImage?: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  alignment?: 'left' | 'center' | 'right';
  theme?: 'light' | 'dark';
}

const slides: HeroSlide[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=900&fit=crop',
    title: 'The Autumn Edit',
    subtitle: 'Refined layers for the season ahead',
    ctaText: 'Shop New Arrivals',
    ctaHref: '/collections/new-arrivals',
    alignment: 'center',
    theme: 'dark',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&h=900&fit=crop',
    title: 'Workwear Reimagined',
    subtitle: 'Sharp tailoring meets modern comfort',
    ctaText: 'Explore Collection',
    ctaHref: '/collections/work-essentials',
    alignment: 'left',
    theme: 'dark',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&h=900&fit=crop',
    title: 'Summer Essentials',
    subtitle: 'Light layers for warm days ahead',
    ctaText: 'Shop Summer',
    ctaHref: '/collections/summer-edit',
    alignment: 'right',
    theme: 'dark',
  },
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];
  const alignClass = slide.alignment === 'left' ? 'text-left items-start' : slide.alignment === 'right' ? 'text-right items-end' : 'text-center items-center';

  return (
    <section className="relative h-[80vh] min-h-[500px] max-h-[800px] overflow-hidden bg-brand-100 dark:bg-brand-900">
      {/* Background Image */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={slide.id}
          custom={direction}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            key={slide.id + '-content'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`flex flex-col ${alignClass} text-white max-w-xl`}
          >
            <p className="text-xs uppercase tracking-[0.3em] mb-3 opacity-80">
              {slide.subtitle}
            </p>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-light mb-6 leading-tight"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {slide.title}
            </h1>
            <Link to={slide.ctaHref}>
              <Button size="lg" className="bg-white text-brand-950 hover:bg-brand-100">
                {slide.ctaText}
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors hidden sm:flex"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors hidden sm:flex"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? 'w-8 bg-white' : 'w-1.5 bg-white/50'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
