import React from 'react';
import { useContent } from '../context/ContentContext';
import { Phone, Mail } from 'lucide-react';

const TopBar: React.FC<{ isScrolled: boolean }> = ({ isScrolled }) => {
  const { content } = useContent();

  const { topBar: langContentTopBar, socials: langContentSocials } = content;

  return (
    <div
      className={`transition-all duration-300 overflow-hidden ${isScrolled ? 'max-h-0' : 'max-h-12'}`}
      aria-hidden={isScrolled}
      role="toolbar"
      aria-label="Top bar with contact and social links"
    >
      <div className="bg-transparent text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-10 flex justify-between items-center text-xs sm:text-sm">
                <div className="flex items-center gap-4 sm:gap-6">
                    <a href={`tel:${langContentTopBar.phone}`} className="flex items-center gap-2 hover:text-slate-200 transition-colors drop-shadow-sm">
                    <Phone size={14} />
                    <span className="hidden sm:inline">{langContentTopBar.phone}</span>
                    </a>
                    <a href={`mailto:${langContentTopBar.email}`} className="flex items-center gap-2 hover:text-slate-200 transition-colors drop-shadow-sm">
                    <Mail size={14} />
                    <span className="hidden sm:inline">{langContentTopBar.email}</span>
                    </a>
                </div>
                <div className="flex items-center gap-4">
                  {langContentSocials.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.ariaLabel}
                      className="hover:text-slate-200 transition-colors drop-shadow-sm"
                    >
                      <social.icon size={16} />
                    </a>
                  ))}
                </div>
            </div>
            <div className="border-b border-white/20"></div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;