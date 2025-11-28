import React, { useState, useRef } from 'react';
import { useContent } from '../context/ContentContext';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const FAQItem: React.FC<{
  item: { question: string; answer: string };
  isOpen: boolean;
  onClick: () => void;
  index: number;
}> = ({ item, isOpen, onClick, index }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      className={`bg-white rounded-xl border transition-all duration-300 animate-on-scroll ${isOpen ? 'shadow-lg border-red-200' : 'shadow-md border-slate-200/80 hover:shadow-lg'}`} 
      style={{ transitionDelay: `${200 + index * 100}ms` }}
    >
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left p-6"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <div className="flex items-center space-x-4">
            <div className={`p-2 rounded-full transition-colors duration-300 bg-red-100`}>
              <HelpCircle className={`transition-colors duration-300 text-red-600`} size={20} />
            </div>
            <span className={`text-base md:text-lg font-medium transition-colors duration-300 ${isOpen ? 'text-red-600' : 'text-slate-800'}`}>{item.question}</span>
        </div>
        <ChevronDown
          className={`text-slate-500 transform transition-transform duration-300 flex-shrink-0 ml-4 ${isOpen ? 'rotate-180 text-red-600' : ''}`}
          size={24}
        />
      </button>
      <div
        ref={contentRef}
        id={`faq-answer-${index}`}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px' }}
      >
        <div className="pb-6 px-6 pl-16 text-slate-600 leading-relaxed">
          {item.answer}
        </div>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const { content } = useContent();
  const langContent = content.faq;
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Open first question by default
  const sectionRef = useRef<HTMLDivElement>(null);
  useScrollAnimation(sectionRef, { threshold: 0.1 });

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" ref={sectionRef} className="py-20 lg:py-32 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-4 animate-on-scroll">{langContent.title}</h2>
          <p className="text-lg text-slate-600 animate-on-scroll" style={{ transitionDelay: '100ms' }}>{langContent.subtitle}</p>
        </div>
        <div className="max-w-4xl mx-auto space-y-4">
          {langContent.list.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;