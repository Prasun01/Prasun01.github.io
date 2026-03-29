import { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import AboutPanel from './components/AboutPanel';
import Lightbox from './components/Lightbox';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import { useUnsplash } from './hooks/useUnsplash';
import { useGsapAnimations } from './hooks/useGsapAnimations';

function App() {
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [lightboxData, setLightboxData] = useState({ isOpen: false, imgData: null });
  const [category, setCategory] = useState('All');

  // Data fetching hook with infinite scroll and categories
  const { photos, hasMore, loadMore, loading } = useUnsplash(category);
  
  // Custom animation hook integration
  useGsapAnimations(isPreloaderDone && !loading);

  const openLightbox = (imgData) => setLightboxData({ isOpen: true, imgData });
  const closeLightbox = () => setLightboxData({ isOpen: false, imgData: null });
  const toggleAbout = () => setIsAboutOpen(prev => !prev);

  // Since original has `opacity-0` removed on body load, react can handle this
  useEffect(() => {
    document.body.classList.remove('opacity-0');
  }, []);

  return (
    <>
      {/* Background FX */}
      <div className="noise-overlay"></div>
      <div className="ambient-blob blob-1"></div>
      <div className="ambient-blob blob-2"></div>

      {/* Grid Lines - Matching index (1).html */}
      <div className="grid-line vert left-6 md:left-[15%]"></div>
      <div className="grid-line vert right-6 md:right-[15%]"></div>
      <div className="grid-line vert left-[50%] hidden md:block"></div>

      {/* Core UI Overlays */}
      <Cursor />
      <Preloader onComplete={() => setIsPreloaderDone(true)} />
      <Nav onMenuClick={toggleAbout} />
      <AboutPanel isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
      <Lightbox isOpen={lightboxData.isOpen} imageData={lightboxData.imgData} onClose={closeLightbox} />

      {/* Main Content */}
      <main id="main-content">
        <Hero />
        <Gallery 
          photos={photos} 
          hasMore={hasMore} 
          onLoadMore={loadMore} 
          onImageClick={openLightbox} 
          category={category}
          setCategory={setCategory}
          loading={loading}
        />
        <Footer />
      </main>
    </>
  );
}

export default App;
