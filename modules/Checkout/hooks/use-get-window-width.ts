import { useState, useEffect } from 'react';

export const useGetWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState<any>();

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { windowWidth };
};
