import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export function useGsapAnimations(isReady) {
  useEffect(() => {
    if (!isReady) return;

    const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
    let lenis = null;
    let rafId = null;

    // Only initialize Lenis on desktop pointer devices
    if (!isTouch) {
      lenis = new Lenis({
        duration: 1.2,
        smooth: true,
      });

      function raf(time) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
      window.__lenis = lenis;
    }

    // Initial Hero Animations
    const tl = gsap.timeline({ delay: 0.2 });
    tl.to('.hero-anim', { y: 0, duration: 1.4, ease: 'power4.out', stagger: 0.1 })
      .to('.hero-fade', { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 }, '-=0.8');

    // Blob Animations
    gsap.to('.blob-1', { x: '10%', y: '10%', duration: 20, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.blob-2', { x: '-10%', y: '-10%', duration: 25, repeat: -1, yoyo: true, ease: 'sine.inOut' });

    // Cleanup lenis and triggers on unmount
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) {
        lenis.destroy();
        window.__lenis = null;
      }
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isReady]);

  // Parallax for desktop work items
  useEffect(() => {
    if (!isReady) return;
    
    const timeout = setTimeout(() => {
      const isDesktop = window.innerWidth >= 1024 && !window.matchMedia('(pointer: coarse)').matches;
      if (!isDesktop) return;

      const workItems = document.querySelectorAll('.work-item');
      workItems.forEach(item => {
        const img = item.querySelector('img');
        if (!img || img._hasParallax) return;

        img._hasParallax = true;
        gsap.fromTo(img, 
          { yPercent: -3 }, 
          { 
            yPercent: 3,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          }
        );
      });
      ScrollTrigger.refresh();
    }, 150);

    return () => clearTimeout(timeout);
  });
}
