import React, { useState, useEffect } from 'react';
import { ArrowUp, MessageSquare, X } from 'lucide-react';
import VirtualAssistant from './VirtualAssistant';
import { useContent } from '../context/ContentContext';

const FloatingActionButton: React.FC<{ onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void; href?: string; 'aria-label': string; children: React.ReactNode; className?: string; isVisible: boolean; delay?: string }> = ({ onClick, href, 'aria-label': ariaLabel, children, className = '', isVisible, delay = '0ms' }) => {
  const commonClasses = `p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform flex items-center justify-center ${
    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
  }`;

  const style = { transitionDelay: isVisible ? delay : '0ms' };

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel} className={`${commonClasses} ${className}`} style={style}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} aria-label={ariaLabel} className={`${commonClasses} ${className}`} style={style}>
      {children}
    </button>
  );
};

const FloatingActions: React.FC = () => {
  const { content } = useContent();
  const [isScrollToTopVisible, setIsScrollToTopVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  const { whatsappUrl } = content.assistant;

  useEffect(() => {
    const toggleVisibility = () => {
      setIsScrollToTopVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const toggleChat = () => {
    setIsChatOpen(prev => !prev);
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
        <FloatingActionButton
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="bg-slate-600 text-white hover:bg-slate-700"
            isVisible={isScrollToTopVisible}
          >
            <ArrowUp size={24} />
        </FloatingActionButton>
        
        <FloatingActionButton
            href={whatsappUrl}
            aria-label="Contact us on WhatsApp"
            className="bg-[#25D366] text-white hover:bg-[#128C7E]"
            isVisible={true}
            delay="100ms"
          >
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.654 4.288 1.902 6.128l.709 1.163-1.611 5.864 5.867-1.611z"/></svg>
        </FloatingActionButton>

        <FloatingActionButton
            onClick={toggleChat}
            aria-label={isChatOpen ? "Close chat" : "Open virtual assistant"}
            className="bg-red-600 text-white hover:bg-red-700"
            isVisible={true}
            delay="200ms"
          >
            {isChatOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </FloatingActionButton>
      </div>

      <VirtualAssistant isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default FloatingActions;