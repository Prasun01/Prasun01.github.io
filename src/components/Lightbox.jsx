import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Lightbox({ isOpen, imageData, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!imageData) return null;

  const photo = imageData;
  const highRes = photo.urls?.regular ? photo.urls.regular.split('?')[0] + '?q=95&w=2000' : '';
  const title = photo.description || photo.alt_description || "Selected Work";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed inset-0 z-[110] bg-black/95 flex items-center justify-center"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 md:top-8 md:right-8 text-white font-sans text-xs uppercase tracking-widest hover:line-through cursor-trigger z-50 p-4"
            id="close-lightbox"
          >
            Close View
          </button>
          
          <div className="relative w-full h-full flex flex-col items-center justify-center pointer-events-none p-6 md:p-12 lg:p-16">
            <div className="flex-1 w-full flex items-center justify-center pointer-events-none">
                <img 
                  src={highRes} 
                  className="max-w-full max-h-full object-contain shadow-2xl pointer-events-auto"
                  alt={title} 
                />
            </div>
            <div className="w-full pt-8 md:pt-12 text-center pointer-events-none z-10 shrink-0">
                <h3 className="text-white font-display uppercase leading-tight tracking-tight break-words" 
                    style={{ fontSize: 'clamp(1.5rem, 5vw, 5rem)' }}>
                    {title.toUpperCase()}
                </h3>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
