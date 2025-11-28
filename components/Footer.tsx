import React from 'react';
import { useContent } from '../context/ContentContext';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useToast } from '../context/ToastContext';
// FIX: Changed import to a default import to resolve module resolution error.
import Logo from './Logo';

const SocialLink: React.FC<{ href: string; 'aria-label': string; children: React.ReactNode }> = ({ href, 'aria-label': ariaLabel, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel} className="bg-slate-700/50 text-slate-300 hover:bg-red-600 hover:text-white transition-all duration-300 w-10 h-10 rounded-full flex items-center justify-center">
        {children}
    </a>
);

const Footer: React.FC = () => {
  const { content } = useContent();
  const { addToast } = useToast();
  const { footer: footerContent, contact, socials } = content;
  const { addressCard, contactCard } = contact;

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (targetId.startsWith('#') && targetId.length > 1) {
        event.preventDefault();
        document.getElementById(targetId.substring(1))?.scrollIntoView({ behavior: 'smooth' });
    }
    // Allow default behavior for links like '#'
  };
  
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Thank you for subscribing!', 'success');
    const form = e.target as HTMLFormElement;
    form.reset();
  };

  return (
    <footer className="bg-[#0D1F3C] text-slate-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: About & Socials */}
          <div className="space-y-4">
            <Logo className="h-10 w-auto text-white" />
            <p className="text-slate-400 max-w-xs">{footerContent.tagline}</p>
            <div className="flex space-x-3 pt-2">
              {socials.map((social) => (
                <SocialLink key={social.name} href={social.href} aria-label={social.ariaLabel}>
                  <social.icon size={20} />
                </SocialLink>
              ))}
            </div>
          </div>
          
          {/* Column 2: Nos Pôles */}
          <div className="mt-2">
            <h4 className="font-bold text-lg text-white mb-5">{footerContent.servicesTitle}</h4>
            <ul className="space-y-3">
              {footerContent.servicesLinks.map((link, index) => (
                <li key={index}>
                    <a href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="hover:text-red-400 transition-colors">
                        {link.text}
                    </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Liens Rapides */}
          <div className="mt-2">
            <h4 className="font-bold text-lg text-white mb-5">{footerContent.quickLinksTitle}</h4>
            <ul className="space-y-3">
              {footerContent.quickLinks.map((link, index) => (
                <li key={index}>
                    <a href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="hover:text-red-400 transition-colors">
                        {link.text}
                    </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="mt-2">
            <h4 className="font-bold text-lg text-white mb-5">{footerContent.contactTitle}</h4>
            <ul className="space-y-4 text-slate-400">
                <li className="flex items-start gap-3">
                    <MapPin size={20} className="text-red-500 mt-1 flex-shrink-0" />
                    <span>{addressCard.address}<br/>{addressCard.country}</span>
                </li>
                <li className="flex items-start gap-3">
                    <Phone size={20} className="text-red-500 mt-1 flex-shrink-0" />
                    <span>{contactCard.phone}</span>
                </li>
                <li className="flex items-start gap-3">
                    <Mail size={20} className="text-red-500 mt-1 flex-shrink-0" />
                    <span>{contactCard.email}</span>
                </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Newsletter Section */}
      <div className="border-y border-slate-800/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <div className="grid lg:grid-cols-2 gap-6 items-center">
                  <div>
                      <h3 className="font-bold text-xl text-white">{footerContent.newsletter.title}</h3>
                      <p className="text-slate-400 mt-1">{footerContent.newsletter.subtitle}</p>
                  </div>
                  <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-2">
                      <input 
                          type="email"
                          required
                          placeholder={footerContent.newsletter.placeholder}
                          aria-label={footerContent.newsletter.placeholder}
                          className="w-full bg-slate-800/50 border border-slate-700 rounded-md py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                      />
                      <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-md transition-colors flex-shrink-0">
                          {footerContent.newsletter.button}
                      </button>
                  </form>
              </div>
          </div>
      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col sm:flex-row justify-between items-center text-center gap-4">
            <p className="text-sm text-slate-500 order-2 sm:order-1">{footerContent.copyright}</p>
            <div className="flex items-center gap-6 order-1 sm:order-2">
                <a href="#" className="text-sm hover:text-white transition-colors">{footerContent.bottomLinks.conditions}</a>
                <a href="#" className="text-sm hover:text-white transition-colors">{footerContent.bottomLinks.privacy}</a>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;