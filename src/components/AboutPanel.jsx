import { useEffect } from 'react';

export default function AboutPanel({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Pause Lenis smooth scroll so the modal drawer scrolls natively with zero interference
      window.__lenis?.stop();
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      window.__lenis?.start();
    }
    return () => {
      document.body.style.overflow = '';
      window.__lenis?.start();
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop overlay */}
      {isOpen && (
        <div 
          onClick={onClose} 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99] transition-opacity duration-500"
          aria-hidden="true"
        />
      )}

      <div 
        data-lenis-prevent="true"
        className={`fixed top-0 right-0 w-full sm:w-[85vw] md:w-[60vw] lg:w-[45vw] h-full bg-[#111] text-[#f4f4f0] z-[100] transform panel-transition overflow-y-auto overscroll-contain no-scrollbar shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="min-h-full p-6 sm:p-10 md:p-14 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
              <span className="font-display text-lg sm:text-xl font-bold tracking-wide">About</span>
              <button 
                onClick={onClose}
                className="font-sans text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors cursor-trigger active:scale-95"
                id="close-about"
              >
                Close
              </button>
            </div>

            <div className="space-y-6 md:space-y-8 mt-2">
              <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 overflow-hidden rounded-full mb-4 border border-white/10 relative group">
                <img 
                  src="/myimage.jpg" 
                  alt="Prasun Mishra" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                />
                <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10"></div>
              </div>

              <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold leading-tight">
                Quiet Geometry<br />
                & Urban Stillness.
              </h2>
              <div className="max-w-md space-y-4 sm:space-y-5 font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                <p>
                  I'm <strong className="font-semibold text-white">Prasun Mishra</strong>, a photographer based in India. I'm drawn to the quiet geometry of the built world — the lines, rhythms, and stillness hiding inside everyday cityscapes.
                </p>
                <p>
                  My work lives in architecture and urban minimalism: clean frames, strong structure, nothing extra. I shoot with a Nikon D3400, mostly wandering cities and waiting for the moment a building, a shadow, or an empty space arranges itself into something worth keeping.
                </p>
                <p>
                  I share my photographs freely on <a href="https://unsplash.com/@prasunmishra1" target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4 hover:text-neutral-300 transition-colors">Unsplash</a>, where they're downloaded and used by people all over the world.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 border-t border-white/15 pt-6 mt-8">
            <div className="flex flex-col gap-1 sm:gap-2">
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-neutral-400 font-semibold">Socials</span>
              <div className="flex flex-col gap-1">
                <a href="https://unsplash.com/@prasunmishra1" target="_blank" rel="noopener noreferrer" className="font-display text-base hover:text-neutral-300 transition-colors cursor-trigger">
                  Unsplash ↗
                </a>
                <a href="https://www.instagram.com/shotbyprasun" target="_blank" rel="noopener noreferrer" className="font-display text-base hover:text-neutral-300 transition-colors cursor-trigger">
                  Instagram ↗
                </a>
                <a href="https://x.com/prasunmishra0" target="_blank" rel="noopener noreferrer" className="font-display text-base hover:text-neutral-300 transition-colors cursor-trigger">
                  X / Twitter ↗
                </a>
                <a href="https://github.com/Prasun01" target="_blank" rel="noopener noreferrer" className="font-display text-base hover:text-neutral-300 transition-colors cursor-trigger">
                  GitHub ↗
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-1 sm:gap-2">
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-neutral-400 font-semibold">Contact</span>
              <a href="mailto:Prasunmishra910@gmail.com" className="font-display text-sm sm:text-base hover:text-neutral-300 transition-colors cursor-trigger break-all">
                Prasunmishra910@gmail.com
              </a>
              <span className="font-sans text-xs text-neutral-400 mt-1">Available for Hire</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
