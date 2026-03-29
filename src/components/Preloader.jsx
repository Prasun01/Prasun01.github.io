import { useEffect, useState } from 'react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let currentProgress = 0;
    
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 5) + 1;
      if (currentProgress > 100) currentProgress = 100;
      
      setProgress(currentProgress);

      if (currentProgress === 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 700); // Wait for slide up animation
        }, 500);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[10000] bg-[#f4f4f0] flex flex-col justify-end p-6 md:p-12 transition-transform duration-700 ease-[cubic-bezier(0.87,0,0.13,1)] ${
        !isLoading ? '-translate-y-full' : ''
      }`}
    >
      <div className="w-full border-t border-black/20 mb-4 relative overflow-hidden h-[1px]">
        <div 
          className="absolute top-0 left-0 h-full w-full bg-black transform transition-transform duration-75"
          style={{ transform: `translateX(-${100 - progress}%)` }}
        ></div>
      </div>
      <div className="flex justify-between items-baseline text-ink">
        <span className="font-display text-6xl md:text-8xl leading-none">
          {progress.toString().padStart(3, '0')}
        </span>
        <span className="font-sans text-xs uppercase tracking-widest opacity-60">Initializing Archive</span>
      </div>
    </div>
  );
}
