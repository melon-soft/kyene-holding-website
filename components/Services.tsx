import React, { useRef } from 'react';
import { useContent } from '../context/ContentContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useRouter } from '../hooks/useRouter';
import { Briefcase, Building, Leaf, Plane, Wrench } from 'lucide-react';

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Building,
  Briefcase,
  Wrench,
  Plane,
  Leaf
};

const Services: React.FC = () => {
  const { content } = useContent();
  const { navigate } = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  useScrollAnimation(sectionRef, { threshold: 0.1 });

  const { services } = content;

  const handleMultiservicesClick = () => {
    navigate('/multiservices');
  };

  return (
    <section id="services" ref={sectionRef} className="py-20 lg:py-32 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h3 className="text-red-600 font-semibold uppercase mb-2 animate-on-scroll">{services.subtitle}</h3>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-16 animate-on-scroll" style={{ transitionDelay: '100ms' }}>{services.title}</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.list.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Briefcase;
            
            return (
              <div 
                key={index} 
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-on-scroll"
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <div className="bg-red-100 text-red-600 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <IconComponent className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h4>
                <p className="text-slate-600 leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
