import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { twMerge } from '../../utils/cn';

interface ImageGalleryProps {
  images: { url: string; alt?: string; alt_text?: string }[];
  selectedColor?: string;
}

export function ImageGallery({ images, selectedColor }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  const currentImage = images[currentIndex] || images[0];

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto lg:max-h-[600px] scrollbar-hide">
        {images.map((image, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={twMerge(
              'flex-shrink-0 w-16 h-20 lg:w-20 lg:h-24 rounded overflow-hidden border-2 transition-all',
              i === currentIndex
                ? 'border-brand-900 dark:border-white'
                : 'border-transparent hover:border-brand-300 dark:hover:border-brand-600'
            )}
          >
            <img src={image.url} alt={image.alt} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 relative">
        <div
          ref={imageRef}
          className="relative aspect-[3/4] rounded overflow-hidden bg-brand-50 dark:bg-brand-900 cursor-zoom-in"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImage.url}
              src={currentImage.url}
              alt={currentImage.alt}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={twMerge(
                'w-full h-full object-cover transition-transform duration-200',
                isZoomed && 'scale-150'
              )}
              style={
                isZoomed
                  ? { transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` }
                  : undefined
              }
            />
          </AnimatePresence>

          {/* Zoom indicator */}
          {!isZoomed && (
            <div className="absolute bottom-4 right-4 p-2 bg-white/80 dark:bg-brand-900/80 rounded-full backdrop-blur-sm">
              <ZoomIn className="w-4 h-4" />
            </div>
          )}
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-brand-900/80 backdrop-blur-sm hover:bg-white dark:hover:bg-brand-900 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-brand-900/80 backdrop-blur-sm hover:bg-white dark:hover:bg-brand-900 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Dots indicator for mobile */}
        {images.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-3 lg:hidden">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={twMerge(
                  'w-1.5 h-1.5 rounded-full transition-all',
                  i === currentIndex ? 'w-4 bg-brand-900 dark:bg-white' : 'bg-brand-300 dark:bg-brand-600'
                )}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
