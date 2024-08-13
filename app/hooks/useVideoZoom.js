// hooks/useVideoZoom.js
import { useState, useCallback } from 'react';

export const useVideoZoom = () => {
  const [isZoomed, setIsZoomed] = useState(false);

  const toggleZoom = useCallback(() => {
    setIsZoomed(prev => !prev);
  }, []);

  return { isZoomed, toggleZoom };
};