import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Lightbox({ isOpen, imageData, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!imageData) return null;

  const photo = imageData;
  // Use full high resolution if available, fallback to 2400px optimized regular
  const highRes = photo.urls?.full || (photo.urls?.regular ? photo.urls.regular.split('?')[0] + '?q=95&w=2400' : '');
  const title = photo.description || photo.alt_description || "Selected Work";
  const location = photo.location ? (photo.location.name || photo.location.city) : '';
  const dimensions = photo.width && photo.height ? `${photo.width} × ${photo.height}px` : '';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed inset-0 z-[110] bg-black/95 flex flex-col justify-between p-4 sm:p-6 md:p-8 select-none"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          {/* Top Bar with Controls */}
          <div className="w-full flex justify-between items-center z-50 shrink-0 mb-2">
            <span className="text-white/60 font-sans text-[11px] sm:text-xs uppercase tracking-widest">
              High Resolution Preview
            </span>
            <button 
              onClick={onClose}
              className="text-white font-sans text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center gap-1.5 transition-all cursor-trigger active:scale-95"
              id="close-lightbox"
              aria-label="Close Preview"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Close</span>
            </button>
          </div>
          
          {/* Main Image Frame - min-h-0 ensures NO CROPPING on any resolution */}
          <div 
            className="flex-1 w-full min-h-0 flex items-center justify-center pointer-events-auto p-1 sm:p-3 overflow-hidden cursor-zoom-out"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
          >
            <img 
              src={highRes} 
              className="max-w-full max-h-full object-contain shadow-2xl rounded-sm transition-transform duration-300"
              alt={title} 
            />
          </div>

          {/* Caption & Metadata Bar */}
          <div className="w-full pt-3 sm:pt-4 text-center shrink-0 z-10 pointer-events-none">
            <h3 className="text-white font-display uppercase tracking-wide text-sm sm:text-lg md:text-2xl font-bold break-words max-w-3xl mx-auto px-2 line-clamp-2">
              {title}
            </h3>
            <div className="flex items-center justify-center gap-3 mt-1 sm:mt-1.5 text-white/50 font-sans text-[10px] sm:text-xs uppercase tracking-widest">
              {location && <span>{location}</span>}
              {location && dimensions && <span>•</span>}
              {dimensions && <span>{dimensions}</span>}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
