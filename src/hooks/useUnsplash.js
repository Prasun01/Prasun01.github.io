import { useState, useEffect, useCallback, useRef } from 'react';

export function formatTitle(text) {
  if (!text) return "UNTITLED";
  const cleanText = text.replace(/<\/?[^>]+(>|$)/g, "");
  const words = cleanText.split(' ');
  if (words.length <= 1) return words[0].toUpperCase();
  return `${words[0].toUpperCase()} ${words[1].toUpperCase()}`; 
}

export function formatMeta(photo, index) {
  if (!photo) return '';
  const loc = photo.location ? (photo.location.name || photo.location.city) : 'Unknown';
  return `${loc || 'Studio'} /// 0${index + 1}`;
}

export function useUnsplash(category = 'All') {
  const [allPhotos, setAllPhotos] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchRef = useRef(false);

  const fetchPhotos = useCallback(async (pageNum) => {
    if (fetchRef.current) return;
    fetchRef.current = true;
    setLoading(true);

    try {
      const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
      if (!ACCESS_KEY) console.warn("Missing Unsplash Key");
      
      const USERNAME = 'prasunmishra1';
      const response = await fetch(`https://api.unsplash.com/users/${USERNAME}/photos?client_id=${ACCESS_KEY}&page=${pageNum}&per_page=12&order_by=latest`);
      
      if (response.ok) {
        const fetchedPhotos = await response.json();
        if (fetchedPhotos.length === 0) {
          setHasMore(false);
        } else {
          setAllPhotos(prev => pageNum === 1 ? fetchedPhotos : [...prev, ...fetchedPhotos]);
        }
      }
    } catch (error) {
      console.error("Fetch failed:", error);
    } finally {
      setLoading(false);
      fetchRef.current = false;
    }
  }, []);

  useEffect(() => {
    fetchPhotos(page);
  }, [page, fetchPhotos]);

  useEffect(() => {
    let filtered = allPhotos;
    if (category === 'Portraits') {
      filtered = allPhotos.filter(p => p.width < p.height);
    } else if (category === 'Landscapes') {
      filtered = allPhotos.filter(p => p.width >= p.height);
    }
    setPhotos(filtered);
  }, [allPhotos, category]);

  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      setPage(prev => prev + 1);
    }
  }, [hasMore, loading]);

  return { photos, hasMore, loadMore, loading };
}
