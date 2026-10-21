import { useEffect } from 'react';
import { X } from 'lucide-react';
import { twMerge } from '../../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  showClose?: boolean;
  showHandle?: boolean;
  height?: 'auto' | 'half' | 'full';
}

export function BottomSheet({
  isOpen,
  onClose,
  title,
  children,
  className,
  showClose = true,
  showHandle = true,
  height = 'auto',
}: BottomSheetProps) {
  // Close on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const heightClasses = {
    auto: 'max-h-[85vh]',
    half: 'h-[50vh]',
    full: 'h-[90vh]',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          
          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={twMerge(
              'fixed bottom-0 left-0 right-0 z-50',
              'bg-white dark:bg-brand-950',
              'rounded-t-2xl shadow-2xl',
              'flex flex-col',
              heightClasses[height],
              className
            )}
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            {/* Handle */}
            {showHandle && (
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-brand-300 dark:bg-brand-700" />
              </div>
            )}

            {/* Header */}
            {(title || showClose) && (
              <div className="flex items-center justify-between px-4 py-3 border-b border-brand-100 dark:border-brand-800 flex-shrink-0">
                {title && (
                  <h2 className="text-sm font-medium uppercase tracking-wider">
                    {title}
                  </h2>
                )}
                {showClose && (
                  <button
                    onClick={onClose}
                    className="p-2 -mr-2 hover:bg-brand-100 dark:hover:bg-brand-800 rounded transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
