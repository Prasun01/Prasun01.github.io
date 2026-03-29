export default function Nav({ onMenuClick }) {
  return (
    <nav className="fixed top-0 left-0 w-full px-6 md:px-8 py-6 md:py-8 flex justify-between items-start z-50 mix-blend-difference text-gallery">
      <div className="flex flex-col">
        <a href="#" className="font-display font-bold text-lg uppercase tracking-wide cursor-trigger">Prasun.</a>
        <span className="font-sans text-xs tracking-widest opacity-60">Est. 2026</span>
      </div>
      <div className="flex flex-col items-end gap-1">
        <button 
          onClick={onMenuClick}
          className="font-sans text-xs uppercase font-bold tracking-widest hover:line-through cursor-trigger p-2 -mr-2"
        >
          About
        </button>
      </div>
    </nav>
  );
}
