export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="h-[70vh] bg-[#111] text-gallery flex flex-col justify-between p-6 md:p-16 relative overflow-hidden">
      <div className="flex justify-between w-full z-10">
        <span className="font-display font-bold text-xl">Prasun.</span>
        <span 
          className="font-sans text-xs uppercase tracking-widest opacity-50 cursor-trigger" 
          onClick={scrollToTop}
        >
          Back to Top
        </span>
      </div>

      <div className="relative z-10 w-full overflow-hidden mb-8">
        <p className="font-sans text-xs uppercase tracking-widest opacity-50 mb-4">Start a conversation</p>
        
        <div className="flex gap-8 animate-marquee whitespace-nowrap">
          <span className="font-display text-[8vw] md:text-[6vw] font-bold uppercase opacity-80">Get in Touch — Work With Me — Start a Project —</span>
          <span className="font-display text-[8vw] md:text-[6vw] font-bold uppercase opacity-80">Get in Touch — Work With Me — Start a Project —</span>
        </div>
        
        <a href="mailto:Prasunmishra910@gmail.com" className="block mt-8 font-sans text-lg md:text-xl hover:text-gray-400 transition-colors cursor-trigger break-all">
          Prasunmishra910@gmail.com
        </a>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-end w-full z-10 border-t border-white/20 pt-8 gap-8">
        <div className="flex gap-4 md:gap-8 font-sans text-sm font-medium">
          <a href="https://unsplash.com/@prasunmishra1" target="_blank" rel="noopener noreferrer" className="hover:underline cursor-trigger">Unsplash</a>
          <a href="#" className="hover:underline cursor-trigger">LinkedIn</a>
        </div>
        <p className="font-sans text-xs opacity-30">© 2026 Prasun Mishra. All rights reserved.</p>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap opacity-[0.03] pointer-events-none">
        <span className="font-display text-[30vw] font-black uppercase">Canvas</span>
      </div>
    </section>
  );
}
