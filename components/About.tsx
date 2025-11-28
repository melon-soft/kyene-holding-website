import React, { useRef } from 'react';
import { useContent } from '../context/ContentContext';
import AnimatedStat from './AnimatedStat';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const About: React.FC = () => {
  const { content } = useContent();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useScrollAnimation(sectionRef, { threshold: 0.2 });

  const { about: langContent } = content;

  return (
    <section id="about" ref={sectionRef} className="py-20 lg:py-32 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h3 className="text-red-600 font-semibold uppercase mb-2 animate-on-scroll">{langContent.subtitle}</h3>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6 animate-on-scroll" style={{ transitionDelay: '100ms' }}>{langContent.title}</h2>
            <p className="text-slate-600 mb-4 leading-relaxed animate-on-scroll" style={{ transitionDelay: '200ms' }}>{langContent.p1}</p>
            <p className="text-slate-600 leading-relaxed animate-on-scroll" style={{ transitionDelay: '300ms' }}>{langContent.p2}</p>
            <div className="mt-10 grid grid-cols-3 gap-6 text-center">
              {langContent.stats.map((stat, index) => (
                <div key={index} className="animate-on-scroll" style={{ transitionDelay: `${400 + index * 100}ms`}}>
                   <AnimatedStat finalValue={stat.value} label={stat.label} isVisible={isVisible} />
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-80 lg:h-full rounded-lg overflow-hidden shadow-2xl animate-on-scroll" style={{ transitionDelay: '200ms' }}>
            <img 
              src={langContent.image} 
              alt="About K-yene" 
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;