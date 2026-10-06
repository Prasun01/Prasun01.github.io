export default function Hero() {
  return (
    <section data-color="#f4f4f0" className="min-h-[85vh] sm:min-h-dvh w-full flex flex-col justify-center px-5 sm:px-8 md:px-[8%] lg:px-[10%] pt-28 sm:pt-32 pb-14 sm:pb-20 relative theme-trigger">
      <div className="mb-8 sm:mb-12 w-full">
        <h1 className="font-display font-extrabold big-text uppercase text-ink">
          <div className="line-mask"><span className="hero-anim">Visual</span></div>
          <div className="line-mask"><span className="hero-anim sm:ml-[3%] md:ml-[4%] lg:ml-[6%] text-neutral-400">Poetry</span></div>
          <div className="line-mask"><span className="hero-anim">Archive</span></div>
        </h1>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 sm:gap-8 md:gap-12 mt-4 sm:mt-6 md:mt-12 border-t border-black/10 pt-6 sm:pt-8 w-full">
        <div className="w-full max-w-md">
          <p className="font-sans text-sm sm:text-base font-normal leading-relaxed text-black/80 opacity-0 hero-fade">
            I'm Prasun Mishra, a photographer based in India drawn to the quiet geometry of the built world — the lines, rhythms, and stillness hiding inside everyday cityscapes.
          </p>
        </div>
        <div className="flex flex-wrap gap-8 sm:gap-12 opacity-0 hero-fade w-full md:w-auto justify-start">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-black/50 mb-1 font-semibold">Location</span>
            <span className="font-display text-base sm:text-lg font-bold">India</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-black/50 mb-1 font-semibold">Focus</span>
            <span className="font-display text-base sm:text-lg font-bold">Arch / Minimalism</span>
          </div>
        </div>
      </div>
    </section>
  );
}
