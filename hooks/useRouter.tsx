
import { useState, useEffect, useCallback } from 'react';

export const useRouter = () => {
  const [pathname, setPathname] = useState(window.location.pathname);

  const handlePopState = useCallback(() => {
    setPathname(window.location.pathname);
  }, []);

  useEffect(() => {
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [handlePopState]);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setPathname(window.location.pathname);
  };

  return { pathname, navigate };
};
