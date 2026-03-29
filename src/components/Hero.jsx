export default function Hero() {
  return (
    <section data-color="#f4f4f0" className="min-h-dvh w-full flex flex-col justify-center px-6 md:px-[15%] pt-32 pb-20 relative theme-trigger">
      <div className="mb-12 w-full">
        <h1 className="font-display font-extrabold big-text uppercase text-ink">
          <div className="line-mask"><span className="hero-anim">Visual</span></div>
          <div className="line-mask"><span className="hero-anim md:ml-[5%] lg:ml-[10%] text-gray-400">Poetry</span></div>
          <div className="line-mask"><span className="hero-anim">Archive</span></div>
        </h1>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-end gap-12 mt-4 md:mt-12 border-t border-black/10 pt-8 w-full">
        <div className="max-w-xs">
          <p className="font-sans text-sm font-medium leading-relaxed opacity-0 hero-fade">
            Prasun Mishra is an interdisciplinary photographer exploring the silence of architecture and the noise of nature.
          </p>
        </div>
        <div className="flex gap-12 opacity-0 hero-fade w-full md:w-auto">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Location</span>
            <span className="font-display text-lg">India</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Focus</span>
            <span className="font-display text-lg">Arch / Nature</span>
          </div>
        </div>
      </div>
    </section>
  );
}
