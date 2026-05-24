'use client';

import { useState, useEffect } from 'react';

export function useResponsive() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1920);
  const [height, setHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 1080);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = width < 800 || height < 480;
  const isOneCol = width < 960;
  const isTwoCol = width >= 960 && width < 1280;
  const isThreeCol = width >= 1280;

  return { width, height, isMobile, isOneCol, isTwoCol, isThreeCol };
}