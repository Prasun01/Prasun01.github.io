import { useEffect } from 'react';

export default function AboutPanel({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div 
      className={`fixed top-0 right-0 w-full md:w-1/2 h-full bg-[#111] text-[#f4f4f0] z-[100] transform panel-transition p-6 md:p-16 flex flex-col justify-between overflow-y-auto ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex justify-between items-start mb-8">
        <span className="font-display text-xl font-bold">About</span>
        <button 
          onClick={onClose}
          className="font-sans text-xs uppercase tracking-widest hover:line-through cursor-trigger p-2 -mr-2"
          id="close-about"
        >
          Close
        </button>
      </div>

      <div className="space-y-6 md:space-y-8 mt-4 md:mt-0">
        <div className="w-32 h-32 md:w-48 md:h-48 overflow-hidden rounded-full mb-4 border border-white/10 relative group">
          <img 
            src="/myimage.jpg" 
            alt="Prasun Mishra" 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
          />
          <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10"></div>
        </div>

        <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight">
          Structural Geometry<br />
          & Organic Chaos.
        </h2>
        <div className="max-w-md space-y-6 font-sans text-sm opacity-90 leading-relaxed">
          <p>
            Prasun Mishra is a visual artist based in India, specializing in the juxtaposition of brutalist architectural geometry and the fluid chaos of natural landscapes.
          </p>
          <p>
            His photography isolates the silent, overlooked details of the world—the sharp edge of a building against the sky, or the soft texture of mist in a forest.
          </p>
          <p>
            His style is defined by clean lines, negative space, and a desaturated palette that emphasizes texture over color.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/20 pt-8 pb-8 md:pb-0 mt-8">
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-widest opacity-50">Socials</span>
          <a href="https://unsplash.com/@prasunmishra1" target="_blank" rel="noopener noreferrer" className="font-display text-lg hover:text-gray-400 transition-colors cursor-trigger">Unsplash</a>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-widest opacity-50">Contact</span>
          <a href="mailto:Prasunmishra910@gmail.com" className="font-display text-lg hover:text-gray-400 transition-colors cursor-trigger break-all">Prasunmishra910@gmail.com</a>
          <span className="font-sans text-sm opacity-50 mt-2">Not Available for Hire</span>
        </div>
      </div>
    </div>
  );
}
