export default function Nav({ onMenuClick }) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 sm:px-5 md:px-6 lg:px-8 py-5 sm:py-6 pointer-events-none mix-blend-difference text-white">
      <div className="w-full flex justify-between items-center pointer-events-auto">
        <div className="flex items-center gap-3">
          <a 
            href="#" 
            className="font-display font-extrabold text-base sm:text-lg uppercase tracking-wider cursor-trigger hover:opacity-70 transition-opacity text-white"
          >
            Prasun.
          </a>
          <span className="font-sans text-[10px] tracking-widest text-white/60 uppercase hidden sm:inline-block">
            /// Archive
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={onMenuClick}
            className="font-sans text-[11px] uppercase tracking-widest font-semibold px-4 py-1.5 rounded-full border border-white/60 text-white hover:bg-white hover:text-black transition-all cursor-trigger active:scale-95"
            aria-label="Open About Information"
          >
            About
          </button>
        </div>
      </div>
    </header>
  );
}
