export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="min-h-[55vh] sm:min-h-[70vh] bg-[#111] text-gallery flex flex-col justify-between p-6 sm:p-10 md:p-16 relative overflow-hidden">
      <div className="flex justify-between items-center w-full z-10">
        <span className="font-display font-bold text-lg sm:text-xl tracking-wider">Prasun.</span>
        <button 
          className="font-sans text-xs uppercase tracking-widest text-neutral-400 hover:text-white transition-colors cursor-trigger flex items-center gap-1.5 active:scale-95" 
          onClick={scrollToTop}
          aria-label="Scroll back to top"
        >
          <span>Back to Top</span>
          <span>↑</span>
        </button>
      </div>

      <div className="relative z-10 w-full overflow-hidden my-8 sm:my-10">
        <p className="font-sans text-xs uppercase tracking-widest text-neutral-400 mb-3 sm:mb-4">Start a conversation</p>
        
        <div className="flex gap-8 animate-marquee whitespace-nowrap">
          <span className="font-display text-2xl sm:text-4xl md:text-[5vw] font-extrabold uppercase opacity-85">Get in Touch — Work With Me — Start a Project —</span>
          <span className="font-display text-2xl sm:text-4xl md:text-[5vw] font-extrabold uppercase opacity-85">Get in Touch — Work With Me — Start a Project —</span>
        </div>
        
        <a href="mailto:Prasunmishra910@gmail.com" className="inline-block mt-6 sm:mt-8 font-sans text-base sm:text-xl md:text-2xl hover:text-neutral-300 transition-colors cursor-trigger break-all border-b border-white/20 pb-1">
          Prasunmishra910@gmail.com
        </a>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full z-10 border-t border-white/15 pt-6 sm:pt-8 gap-4 sm:gap-6">
        <div className="flex flex-wrap gap-5 sm:gap-8 font-sans text-xs sm:text-sm font-medium">
          <a href="https://unsplash.com/@prasunmishra1" target="_blank" rel="noopener noreferrer" className="hover:underline cursor-trigger text-neutral-300 hover:text-white">
            Unsplash
          </a>
          <a href="https://www.instagram.com/shotbyprasun" target="_blank" rel="noopener noreferrer" className="hover:underline cursor-trigger text-neutral-300 hover:text-white">
            Instagram
          </a>
          <a href="https://x.com/prasunmishra0" target="_blank" rel="noopener noreferrer" className="hover:underline cursor-trigger text-neutral-300 hover:text-white">
            X / Twitter
          </a>
          <a href="https://github.com/Prasun01" target="_blank" rel="noopener noreferrer" className="hover:underline cursor-trigger text-neutral-300 hover:text-white">
            GitHub
          </a>
        </div>
        <p className="font-sans text-[11px] sm:text-xs text-neutral-400">© 2026 Prasun Mishra. All rights reserved.</p>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap opacity-[0.03] pointer-events-none select-none">
        <span className="font-display text-[30vw] font-black uppercase">Canvas</span>
      </div>
    </footer>
  );
}
