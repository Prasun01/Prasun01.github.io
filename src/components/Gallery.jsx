import { useEffect, useState } from 'react';
import { formatTitle, formatMeta } from '../hooks/useUnsplash';

export default function Gallery({ 
  photos, 
  hasMore, 
  onLoadMore, 
  onImageClick, 
  loading,
  category = 'All',
  setCategory
}) {
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    if (window.bindCursorTriggers) window.bindCursorTriggers();
  }, [photos]);

  const handleImageLoad = (id) => setLoadedImages(prev => ({ ...prev, [id]: true }));

  const categories = ['All', 'Landscapes', 'Portraits'];

  const renderSlot = (photo, i) => {
    if (!photo) return null;
    const title = formatTitle(photo.description || photo.alt_description || "Untitled Work");
    const meta = formatMeta(photo, i, photos.length);
    const isLoaded = loadedImages[photo.id];
    
    // Natural aspect ratio calculation - ensures NO CROPPING of high-res photos
    const width = photo.width || 16;
    const height = photo.height || 9;
    const aspectRatio = width / height;
    const isPortrait = aspectRatio < 0.95;
    
    const layoutIdx = i % 4;

    // Slot 1: Editorial Asymmetric (Text Left / Image Right on desktop; Stacked on mobile)
    if (layoutIdx === 0) {
      return (
        <div key={`${photo.id}-${i}`} className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-6 lg:gap-16 xl:gap-24 mb-16 sm:mb-24 lg:mb-32 relative group work-item">
          <div className="w-full lg:w-2/5 xl:w-1/3 text-left lg:text-right z-10 shrink-0">
            <span className="font-sans text-[11px] sm:text-xs uppercase tracking-widest text-black/50 block mb-1">
              0{i + 1} /// {isPortrait ? 'Portrait' : 'Landscape'}
            </span>
            <h2 className="hidden sm:block font-display project-title transition-transform duration-500 group-hover:translate-x-1 lg:group-hover:-translate-x-2 text-ink">
              {title}
            </h2>
            <p className="font-sans text-xs uppercase tracking-widest mt-1 sm:mt-2 lg:mt-4 text-black/60">{meta}</p>
          </div>
          
          <div className="w-full lg:flex-1 flex justify-center lg:justify-end">
            <div 
              className="w-full max-w-full lg:max-w-[48vw] max-h-[70vh] sm:max-h-[75vh] liquid-img-container cursor-trigger rounded-sm shadow-sm relative overflow-hidden"
              style={{ aspectRatio: `${width} / ${height}` }}
              onClick={() => onImageClick(photo)}
            >
              <img 
                src={photo.urls.regular} 
                onLoad={() => handleImageLoad(photo.id)}
                className={`distort-img w-full h-full object-cover transition-all duration-700 ${isLoaded ? 'loaded' : ''}`} 
                alt={title}
                loading="lazy"
              />
              <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm text-white px-2.5 py-1 rounded text-[10px] uppercase tracking-widest font-sans pointer-events-none hidden sm:block">
                Expand View
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Slot 2: Editorial Asymmetric Reversed (Image Left / Text Right on desktop; Stacked on mobile)
    if (layoutIdx === 1) {
      return (
        <div key={`${photo.id}-${i}`} className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-6 lg:gap-16 xl:gap-24 mb-16 sm:mb-24 lg:mb-32 relative group work-item">
          <div className="w-full lg:w-2/5 xl:w-1/3 text-left z-10 order-1 lg:order-2 shrink-0">
            <span className="font-sans text-[11px] sm:text-xs uppercase tracking-widest text-black/50 block mb-1">
              0{i + 1} /// {isPortrait ? 'Portrait' : 'Landscape'}
            </span>
            <h2 className="hidden sm:block font-display project-title transition-transform duration-500 group-hover:translate-x-1 lg:group-hover:-translate-x-2 text-ink">
              {title}
            </h2>
            <p className="font-sans text-xs uppercase tracking-widest mt-1 sm:mt-2 lg:mt-4 text-black/60">{meta}</p>
          </div>

          <div className="w-full lg:flex-1 flex justify-center lg:justify-start order-2 lg:order-1">
            <div 
              className="w-full max-w-full lg:max-w-[48vw] max-h-[70vh] sm:max-h-[75vh] liquid-img-container cursor-trigger rounded-sm shadow-sm relative overflow-hidden"
              style={{ aspectRatio: `${width} / ${height}` }}
              onClick={() => onImageClick(photo)}
            >
              <img 
                src={photo.urls.regular} 
                onLoad={() => handleImageLoad(photo.id)}
                className={`distort-img w-full h-full object-cover transition-all duration-700 ${isLoaded ? 'loaded' : ''}`} 
                alt={title}
                loading="lazy"
              />
              <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm text-white px-2.5 py-1 rounded text-[10px] uppercase tracking-widest font-sans pointer-events-none hidden sm:block">
                Expand View
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Slot 3: Statement Centered (Title centered, balanced image, meta below)
    if (layoutIdx === 2) {
      return (
        <div key={`${photo.id}-${i}`} className="flex flex-col items-center mb-16 sm:mb-24 lg:mb-36 relative group work-item w-full">
          <div className="mb-3 sm:mb-6 text-left sm:text-center z-10 w-full px-0 sm:px-4">
            <span className="font-sans text-[11px] sm:text-xs uppercase tracking-widest text-black/50 block mb-1">
              0{i + 1} /// Statement
            </span>
            <h2 className="hidden sm:block font-display project-title">{title}</h2>
            <p className="font-sans text-xs uppercase tracking-widest mt-1 text-black/60 block sm:hidden">{meta}</p>
          </div>

          <div className="w-full flex justify-center">
            <div 
              className="w-full max-w-full sm:max-w-[85vw] md:max-w-[55vw] lg:max-w-[48vw] max-h-[70vh] sm:max-h-[75vh] md:max-h-[80vh] liquid-img-container cursor-trigger rounded-sm shadow-sm relative overflow-hidden"
              style={{ aspectRatio: `${width} / ${height}` }}
              onClick={() => onImageClick(photo)}
            >
              <img 
                src={photo.urls.regular} 
                onLoad={() => handleImageLoad(photo.id)}
                className={`distort-img w-full h-full object-cover transition-all duration-700 ${isLoaded ? 'loaded' : ''}`} 
                alt={title}
                loading="lazy"
              />
              <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm text-white px-2.5 py-1 rounded text-[10px] uppercase tracking-widest font-sans pointer-events-none hidden sm:block">
                Expand View
              </div>
            </div>
          </div>

          <p className="font-sans text-xs uppercase tracking-widest mt-4 sm:mt-6 text-black/60 text-center w-full hidden sm:block">{meta}</p>
        </div>
      );
    }

    // Slot 4: Wide Feature Showcase (Clean full showcase without clipping)
    if (layoutIdx === 3) {
      return (
        <div key={`${photo.id}-${i}`} className="w-full mb-16 sm:mb-24 lg:mb-32 relative group work-item flex flex-col gap-4 sm:gap-6">
          <div className="w-full flex justify-center order-2 sm:order-1">
            <div 
              className="w-full max-w-full lg:max-w-[72vw] max-h-[70vh] sm:max-h-[80vh] liquid-img-container cursor-trigger rounded-sm shadow-sm relative overflow-hidden"
              style={{ aspectRatio: `${width} / ${height}` }}
              onClick={() => onImageClick(photo)}
            >
              <img 
                src={photo.urls.regular} 
                onLoad={() => handleImageLoad(photo.id)}
                className={`distort-img w-full h-full object-cover transition-all duration-700 ${isLoaded ? 'loaded' : ''}`} 
                alt={title}
                loading="lazy"
              />
              <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm text-white px-2.5 py-1 rounded text-[10px] uppercase tracking-widest font-sans pointer-events-none hidden sm:block">
                Expand View
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-ink w-full px-0 sm:px-2 gap-1 sm:gap-4 order-1 sm:order-2">
            <div>
              <span className="font-sans text-[11px] sm:text-xs uppercase tracking-widest text-black/50 block mb-0.5 sm:mb-1">
                0{i + 1} /// Showcase
              </span>
              <h2 className="hidden sm:block font-display project-title">{title}</h2>
            </div>
            <p className="font-sans text-xs uppercase tracking-widest text-black/60 shrink-0">{meta}</p>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <section className="w-full px-5 sm:px-8 md:px-[8%] lg:px-[10%] pb-20 sm:pb-32 md:pb-40">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12 sm:mb-16 md:mb-24 border-b border-black/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="h-[1px] w-8 sm:w-12 bg-black"></div>
          <span className="font-sans text-xs uppercase tracking-widest font-bold text-ink">Selected Works</span>
          <span className="font-sans text-[11px] text-black/40">({photos.length})</span>
        </div>

        {/* Orientation Filter Pills */}
        {setCategory && (
          <div className="flex items-center gap-2 self-start sm:self-auto overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`font-sans text-[11px] uppercase tracking-wider px-3 py-1 rounded-full transition-all cursor-trigger ${
                  category === cat
                    ? 'bg-black text-white font-semibold'
                    : 'bg-black/5 text-black/70 hover:bg-black/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-6 sm:gap-10">
        {photos.map((photo, i) => renderSlot(photo, i))}
      </div>

      {/* Manual Load More Control */}
      <div className="w-full flex flex-col justify-center items-center mt-12 sm:mt-16 md:mt-20">
        {hasMore && (
          <button
            id="load-more-btn"
            onClick={onLoadMore}
            disabled={loading}
            className="group inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full border border-black/20 hover:border-black bg-white/60 hover:bg-black text-black hover:text-white transition-all duration-300 font-sans text-xs uppercase tracking-widest font-semibold cursor-trigger shadow-sm active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
            aria-label="Load more photos"
          >
            {loading ? (
              <span className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-current animate-ping"></span>
                <span>Loading Works...</span>
              </span>
            ) : (
              <span className="flex items-center gap-2.5">
                <span>More</span>
                <span className="text-[11px] transform group-hover:translate-y-0.5 transition-transform duration-300">↓</span>
              </span>
            )}
          </button>
        )}
        {!hasMore && photos.length > 0 && (
          <span className="font-sans text-xs uppercase tracking-widest text-black/40">
            — End of Visual Archive —
          </span>
        )}
      </div>
    </section>
  );
}
