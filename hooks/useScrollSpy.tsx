import { useState, useEffect, useRef } from 'react';

export const useScrollSpy = (
  sectionIds: string[],
  options?: IntersectionObserverInit
): string | null => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Disconnect previous observer if it exists
    if (observer.current) {
      observer.current.disconnect();
    }

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      const intersectingEntry = entries.find(entry => entry.isIntersecting);
      if (intersectingEntry) {
        setActiveSection(intersectingEntry.target.id);
      }
    };

    observer.current = new IntersectionObserver(handleIntersect, {
      rootMargin: '0px 0px -50% 0px',
      threshold: 0.5,
      ...options,
    });

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.current?.observe(element);
      }
    });

    // Cleanup function
    return () => {
      observer.current?.disconnect();
    };
  }, [sectionIds, options]);

  return activeSection;
};