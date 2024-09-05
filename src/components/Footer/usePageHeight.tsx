import { useState, useEffect } from 'react';

function usePageHeight() {
  const [isShortPage, setIsShortPage] = useState(false);

  useEffect(() => {
    const checkHeight = () => {
      const pageHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      setIsShortPage(pageHeight <= viewportHeight);
    };

    checkHeight();
    window.addEventListener('resize', checkHeight);

    return () => window.removeEventListener('resize', checkHeight);
  }, []);

  return isShortPage;
}

export default usePageHeight;