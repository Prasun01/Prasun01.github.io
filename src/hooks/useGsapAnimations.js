import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export function useGsapAnimations(isReady) {
  useEffect(() => {
    if (!isReady) return;

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Initial Hero Animations
    const tl = gsap.timeline({ delay: 0.2 });
    tl.to('.hero-anim', { y: 0, duration: 1.5, ease: 'power4.out', stagger: 0.1 })
      .to('.hero-fade', { opacity: 1, y: 0, duration: 1, stagger: 0.2 }, '-=1');

    // Blob Animations
    gsap.to('.blob-1', { x: '10%', y: '10%', duration: 20, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.blob-2', { x: '-10%', y: '-10%', duration: 25, repeat: -1, yoyo: true, ease: 'sine.inOut' });

    // Cleanup lenis and specific triggers on unmount
    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isReady]);

  // Parallax and Color Reveal
  useEffect(() => {
    if (!isReady) return;
    
    // Slight delay to ensure DOM is updated
    const timeout = setTimeout(() => {
      const workItems = document.querySelectorAll('.work-item');
      
      workItems.forEach(item => {
        const img = item.querySelector('img');
        if (!img) return;

        // 1. Simple Parallax
        if (!img._hasParallax) {
            img._hasParallax = true;
            gsap.fromTo(img, 
                { yPercent: -5 }, 
                { 
                    yPercent: 5,
                    ease: "none",
                    scrollTrigger: {
                        trigger: item,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                }
            );
        }

        // 2. Color Reveal on Scroll
        if (!img._hasColorTrigger) {
            img._hasColorTrigger = true;
            ScrollTrigger.create({
                trigger: item,
                start: "top 65%", // Enters focus zone
                end: "bottom 35%", // Leaves focus zone
                onEnter: () => img.classList.remove('grayscale'),
                onLeave: () => img.classList.add('grayscale'),
                onEnterBack: () => img.classList.remove('grayscale'),
                onLeaveBack: () => img.classList.add('grayscale'),
                // Refresh ScrollTrigger on these items
            });
        }
      });
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timeout);
  });
}
