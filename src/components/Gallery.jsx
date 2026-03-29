import { useEffect, useState, useRef } from 'react';
import { formatTitle, formatMeta } from '../hooks/useUnsplash';

export default function Gallery({ photos, hasMore, onLoadMore, onImageClick, loading }) {
  const [loadedImages, setLoadedImages] = useState({});
  const observerTarget = useRef(null);

  useEffect(() => {
    if (window.bindCursorTriggers) window.bindCursorTriggers();
  }, [photos]);

  // Infinite Scroll Observer logic
  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore, loading, onLoadMore]);

  const handleImageLoad = (id) => setLoadedImages(prev => ({ ...prev, [id]: true }));

  // Curated Slots Mapping - Filtering by orientation to match index (1).html logic
  const portraits = photos.filter(p => p.width < p.height);
  const landscapes = photos.filter(p => p.width >= p.height);
  
  const getOrderedPhotos = () => {
    const pts = [...portraits];
    const lds = [...landscapes];
    const result = [];
    
    // Fill blocks of 4 matching the layout pattern
    while (pts.length > 0 || lds.length > 0) {
      // 1. Portrait (4:5)
      const p1 = pts.shift() || lds.shift();
      if (p1) result.push(p1);
      
      // 2. Landscape (16:9)
      const p2 = lds.shift() || pts.shift();
      if (p2) result.push(p2);

      // 3. Portrait (3:5)
      const p3 = pts.shift() || lds.shift();
      if (p3) result.push(p3);

      // 4. Landscape (21:9)
      const p4 = lds.shift() || pts.shift();
      if (p4) result.push(p4);
    }
    return result;
  };

  const orderedPhotos = getOrderedPhotos();

  const renderSlot = (photo, i) => {
    if (!photo) return null;
    const title = formatTitle(photo.description || photo.alt_description || "Untitled Work");
    const meta = formatMeta(photo, i);
    const isLoaded = loadedImages[photo.id];
    
    const layoutIdx = i % 4;

    // Slot 1: Portrait (4:5)
    if (layoutIdx === 0) {
      return (
        <div key={`${photo.id}-${i}`} className="flex flex-col lg:flex-row justify-center items-center gap-16 md:gap-24 mb-24 relative group work-item">
          <div className="w-full lg:w-1/3 text-left lg:text-right z-10 order-1 lg:order-1 shrink-0">
            <h2 className="font-display project-title transition-transform duration-500 group-hover:translate-x-4 text-ink">
              {title}
            </h2>
            <p className="font-sans text-xs uppercase tracking-widest mt-2 lg:mt-4 lg:ml-2">{meta}</p>
          </div>
          <div className="w-full lg:max-w-[45vw] aspect-[4/5] liquid-img-container cursor-trigger order-2 lg:order-2" onClick={() => onImageClick(photo)}>
            <img 
              src={photo.urls.regular} 
              onLoad={() => handleImageLoad(photo.id)}
              className={`distort-img w-full h-full object-cover grayscale transition-all duration-700 ${isLoaded ? 'loaded' : ''}`} 
              alt={title}
            />
          </div>
        </div>
      );
    }

    // Slot 2: Landscape (16:9)
    if (layoutIdx === 1) {
      return (
        <div key={`${photo.id}-${i}`} className="flex flex-col lg:flex-row justify-center items-center gap-16 md:gap-24 mb-24 relative group work-item">
          <div className="w-full lg:flex-1 lg:max-w-[50vw] aspect-[16/9] liquid-img-container cursor-trigger order-2 lg:order-1" onClick={() => onImageClick(photo)}>
            <img 
              src={photo.urls.regular} 
              onLoad={() => handleImageLoad(photo.id)}
              className={`distort-img w-full h-full object-cover grayscale transition-all duration-700 ${isLoaded ? 'loaded' : ''}`} 
              alt={title}
            />
          </div>
          <div className="w-full lg:w-1/3 text-left z-10 order-1 lg:order-2 shrink-0">
            <h2 className="font-display project-title transition-transform duration-500 group-hover:-translate-x-4 text-ink">
              {title}
            </h2>
            <p className="font-sans text-xs uppercase tracking-widest mt-2 lg:mt-4 md:mr-2">{meta}</p>
          </div>
        </div>
      );
    }

    // Slot 3: Portrait (3:5)
    if (layoutIdx === 2) {
      return (
        <div key={`${photo.id}-${i}`} className="flex flex-col items-center mb-24 md:mb-40 relative group work-item">
          <div className="mb-8 text-center z-10 w-full px-4">
            <h2 className="font-display project-title">{title}</h2>
          </div>
          <div className="w-full md:w-[40vw] aspect-[3/5] liquid-img-container cursor-trigger" onClick={() => onImageClick(photo)}>
            <img 
              src={photo.urls.regular} 
              onLoad={() => handleImageLoad(photo.id)}
              className={`distort-img w-full h-full object-cover grayscale transition-all duration-700 ${isLoaded ? 'loaded' : ''}`} 
              alt={title}
            />
          </div>
          <p className="font-sans text-xs uppercase tracking-widest mt-6">{meta}</p>
        </div>
      );
    }

    // Slot 4: Landscape (21:9)
    if (layoutIdx === 3) {
      return (
        <div key={`${photo.id}-${i}`} className="w-full mb-12 md:mb-20 relative group work-item flex flex-col gap-6">
          <div className="w-full aspect-[21/9] liquid-img-container cursor-trigger" onClick={() => onImageClick(photo)}>
            <img 
              src={photo.urls.regular} 
              onLoad={() => handleImageLoad(photo.id)}
              className={`distort-img w-full h-full object-cover grayscale transition-all duration-700 ${isLoaded ? 'loaded' : ''}`} 
              alt={title}
            />
          </div>
          <div className="text-left md:text-center text-ink px-4">
            <h2 className="font-display project-title">{title}</h2>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <section className="w-full px-6 md:px-[5%] pb-24 md:pb-40">
      <div className="flex items-center gap-4 mb-16 md:mb-24 px-0 md:px-[10%]">
        <div className="h-[1px] w-12 bg-black"></div>
        <span className="font-sans text-xs uppercase tracking-widest font-bold">Selected Works</span>
      </div>

      <div className="flex flex-col gap-12">
        {orderedPhotos.map((photo, i) => renderSlot(photo, i))}
      </div>

      {/* Scroll Target for Infinite Scroll */}
      <div ref={observerTarget} className="w-full h-32 flex justify-center items-center mt-20">
        {loading && (
          <span className="font-sans text-xs uppercase tracking-widest opacity-50 animate-pulse">Loading Archive...</span>
        )}
      </div>
    </section>
  );
}
