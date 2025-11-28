import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';
import { useRouter } from '../hooks/useRouter';
import { Menu, X } from 'lucide-react';
import type { Language } from '../types';
import TopBar from './TopBar';
// FIX: Changed import to a default import to resolve module resolution error.
import Logo from './Logo';

interface LanguageSwitcherProps {
  isScrolled: boolean;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ isScrolled }) => {
  const { language, setLanguage } = useLanguage();

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
  };
  
  const baseButtonClass = 'px-3 py-1 rounded-full transition-colors duration-300';
  const activeClass = 'bg-white text-red-600 shadow';
  const inactiveClass = isScrolled 
    ? 'text-slate-600 hover:bg-slate-300' 
    : 'text-slate-200 hover:bg-white/20';

  return (
    <div className={`flex items-center rounded-full p-1 text-sm transition-all duration-300 ${isScrolled ? 'bg-slate-200' : 'bg-white/10 backdrop-blur-sm'}`}>
      <button
        onClick={() => handleSetLanguage('fr')}
        className={`${baseButtonClass} ${ language === 'fr' ? activeClass : inactiveClass }`}
      >
        FR
      </button>
      <button
        onClick={() => handleSetLanguage('en')}
        className={`${baseButtonClass} ${ language === 'en' ? activeClass : inactiveClass }`}
      >
        EN
      </button>
    </div>
  );
};

const Header: React.FC = () => {
  const { content } = useContent();
  const { pathname, navigate } = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    event.preventDefault();
    setIsMenuOpen(false);

    if (targetId === 'home') {
      if (pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
      }
      return;
    }

    if (pathname === '/') {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${targetId}`);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!content) return null; // or a loading state

  const { nav: langContentNav, socials: langContentSocials } = content;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 shadow-md backdrop-blur-sm border-b border-slate-200' : 'bg-transparent'}`}>
      <TopBar isScrolled={isScrolled} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-20' : 'h-24'}`}>
          <div className="flex-shrink-0">
             <a href="#home" onClick={(e) => handleNavClick(e, 'home')} aria-label="K-yene Home">
              <Logo className={`w-auto transition-all duration-300 ${isScrolled ? 'h-10 text-slate-800' : 'h-12 text-white'}`} />
            </a>
          </div>

          <nav className="hidden md:flex md:items-center md:space-x-8">
            {langContentNav.links.map((link) => (
              <a key={link.id} href={`#${link.id}`} onClick={(e) => handleNavClick(e, link.id)} className={`transition-colors font-medium duration-300 ${isScrolled ? 'text-slate-600 hover:text-red-600' : 'text-white hover:text-slate-200 drop-shadow-sm'}`}>
                {link.text}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher isScrolled={isScrolled} />
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="bg-red-600 text-white px-5 py-2.5 rounded-full font-semibold hover:bg-red-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-px">
              {langContentNav.contact}
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`p-1 transition-colors duration-300 ${isScrolled ? 'text-slate-800' : 'text-white drop-shadow-sm'}`}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className={`md:hidden bg-white shadow-lg absolute left-0 w-full ${isScrolled ? 'top-20' : 'top-24'}`}>
          <nav className="flex flex-col items-center space-y-4 p-6">
            {langContentNav.links.map((link) => (
              <a key={link.id} href={`#${link.id}`} onClick={(e) => handleNavClick(e, link.id)} className="text-slate-600 hover:text-red-600 transition-colors font-medium text-lg">
                {link.text}
              </a>
            ))}
             <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition-all shadow-sm w-full text-center">
                {langContentNav.contact}
            </a>
            <LanguageSwitcher isScrolled={true} />
            <div className="flex items-center space-x-6 pt-6 mt-4 border-t border-slate-200 w-full justify-center">
              {langContentSocials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.ariaLabel}
                  className="text-slate-500 hover:text-red-600 transition-colors"
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;