import { useState, useEffect, RefObject } from 'react';

export const useScrollAnimation = (ref: RefObject<HTMLElement>, options?: IntersectionObserverInit): boolean => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Animate the section container itself if it has the class
          if (element.classList.contains('animate-on-scroll')) {
            element.classList.add('is-visible');
          }
          
          // Animate all children with the class
          element.querySelectorAll('.animate-on-scroll').forEach(child => {
            child.classList.add('is-visible');
          });
          
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.1, // A good default, can be overridden
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [ref, options]);

  return isVisible;
};
