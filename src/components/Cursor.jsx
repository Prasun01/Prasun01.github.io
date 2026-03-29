import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const cursorRef = useRef(null);
  const cursorTextRef = useRef(null);
  const [text, setText] = useState('View');
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;
    let isMoving = false;
    let currentTrigger = null;

    const onMouseMove = (e) => {
      mouseX = e.clientX; 
      mouseY = e.clientY;
      if (!isMoving && cursorRef.current) {
        isMoving = true;
        cursorRef.current.style.opacity = 1;
      }

      const trigger = e.target.closest('.cursor-trigger');
      if (trigger !== currentTrigger) {
        if (currentTrigger) {
          setIsHovering(false);
          if (cursorRef.current) gsap.to(cursorRef.current, { width: 14, height: 14, duration: 0.4 });
          setText("View Project");
        }
        currentTrigger = trigger;
        if (trigger) {
          setIsHovering(true);
          if (cursorRef.current) gsap.to(cursorRef.current, { width: 90, height: 90, duration: 0.4, ease: 'power3.out' });
          if (trigger.tagName === 'A' && trigger.href.includes('mailto')) setText("Email Me");
          else if (trigger.classList.contains('liquid-img-container')) setText("Open View");
          else if (trigger.id === 'close-about' || trigger.id === 'close-lightbox') setText("Close");
          else if (trigger.id === 'load-more-btn') setText("Load");
          else setText("View");
        }
      }
    };

    const onMouseDown = () => {
      if (cursorRef.current) gsap.to(cursorRef.current, { scale: 0.8, duration: 0.1, ease: 'power2.out' });
    };

    const onMouseUp = () => {
      if (cursorRef.current) gsap.to(cursorRef.current, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.5)' });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    const tick = () => {
      const dt = 1.0 - Math.pow(1.0 - 0.2, gsap.ticker.deltaRatio());
      cursorX += (mouseX - cursorX) * dt;
      cursorY += (mouseY - cursorY) * dt;
      
      if (cursorRef.current && cursorTextRef.current) {
        cursorRef.current.style.left = `${cursorX}px`;
        cursorRef.current.style.top = `${cursorY}px`;
        cursorTextRef.current.style.left = `${cursorX}px`;
        cursorTextRef.current.style.top = `${cursorY}px`;
      }
    };

    gsap.ticker.add(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      gsap.ticker.remove(tick);
    };
  }, []);

  useEffect(() => {
    if (isHovering) {
      document.body.classList.add('hovering');
    } else {
      document.body.classList.remove('hovering');
    }
  }, [isHovering]);

  return (
    <>
      <div id="cursor" ref={cursorRef}></div>
      <div id="cursor-text" ref={cursorTextRef}>{text}</div>
    </>
  );
}
