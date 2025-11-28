import React, { useState, useEffect, useRef } from 'react';
import { useContent } from '../context/ContentContext';

const Hero: React.FC = () => {
  const { content } = useContent();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);
  
  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const { hero: langContent } = content;

  return (
    <section id="home" ref={sectionRef} className="relative h-screen flex items-center justify-center text-white overflow-hidden bg-[#0D1F3C]">
      <div 
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <h2 className={`text-sm font-semibold text-red-400 mb-4 uppercase tracking-widest transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          {langContent.subtitle}
        </h2>
        <h1 className={`text-5xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg transition-all duration-1000 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          {langContent.title}
        </h1>
        <p className={`text-base md:text-lg max-w-2xl mx-auto text-slate-300 mb-10 drop-shadow transition-all duration-1000 ease-out delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          {langContent.description}
        </p>
        <button 
          onClick={scrollToServices} 
          className={`bg-red-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl duration-1000 ease-out delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
        >
          {langContent.cta}
        </button>
      </div>
    </section>
  );
};

export default Hero;