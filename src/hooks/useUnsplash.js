import { useState, useEffect, useCallback, useRef } from 'react';

export function formatTitle(text) {
  if (!text) return "UNTITLED";
  const cleanText = text.replace(/<\/?[^>]+(>|$)/g, "");
  const words = cleanText.split(' ');
  if (words.length <= 1) return words[0].toUpperCase();
  return `${words[0].toUpperCase()} ${words[1].toUpperCase()}`; 
}

export function formatMeta(photo, index, total) {
  if (!photo) return '';
  const loc = photo.location ? (photo.location.name || photo.location.city) : '';
  const current = String(index + 1).padStart(2, '0');
  const countStr = total ? `${current} of ${String(total).padStart(2, '0')}` : `0${index + 1}`;

  if (loc && loc.trim() && loc.toLowerCase() !== 'unknown') {
    return `${loc} /// ${countStr}`;
  }
  return countStr;
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
          setAllPhotos(prev => {
            if (pageNum === 1) return fetchedPhotos;
            const existingIds = new Set(prev.map(p => p.id));
            const newPhotos = fetchedPhotos.filter(p => !existingIds.has(p.id));
            if (newPhotos.length === 0) {
              setHasMore(false);
              return prev;
            }
            return [...prev, ...newPhotos];
          });
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
