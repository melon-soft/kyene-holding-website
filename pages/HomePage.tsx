import React, { useState, useRef } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Staff from '../components/Staff';
import Services from '../components/Services';
import Projects from '../components/Projects';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import Multiservices from '../components/Multiservices';
import { useContent } from '../context/ContentContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Mail, User, Phone, Building, MessageSquare, Send, X, Loader2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import Videos from '../components/Videos';

const CtaSection: React.FC<{ onOpenModal: () => void }> = ({ onOpenModal }) => {
    const { content } = useContent();
    const langContent = content.cta;
    const sectionRef = useRef<HTMLDivElement>(null);
    useScrollAnimation(sectionRef);

    return (
        <section ref={sectionRef} className="bg-blue-600 text-white py-20 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 animate-on-scroll">{langContent.title}</h2>
                <p className="text-lg text-blue-200 max-w-3xl mx-auto mb-8 animate-on-scroll" style={{ transitionDelay: '100ms' }}>{langContent.description}</p>
                <button
                    onClick={onOpenModal}
                    className="bg-red-600 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-red-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-px animate-on-scroll"
                    style={{ transitionDelay: '200ms' }}
                >
                    {langContent.button}
                </button>
            </div>
        </section>
    );
};

const ContactModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const { content } = useContent();
    const { addToast } = useToast();
    const langContent = content.contactModal;

    const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', message: '' });
    const [errors, setErrors] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            // Reset form when opening
            setFormData({ name: '', email: '', phone: '', company: '', message: '' });
            setErrors({ name: '', email: '', message: '' });
            setIsSubmitting(false);
        } else {
            document.body.style.overflow = 'auto';
        }
        
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = 'auto';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    const validate = () => {
        const newErrors = { name: '', email: '', message: '' };
        let isValid = true;
        
        if (!formData.name.trim()) {
            newErrors.name = langContent.validation.nameRequired;
            isValid = false;
        }
        if (!formData.email.trim()) {
            newErrors.email = langContent.validation.emailRequired;
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = langContent.validation.emailInvalid;
            isValid = false;
        }
        if (!formData.message.trim()) {
            newErrors.message = langContent.validation.messageRequired;
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate() && !isSubmitting) {
            setIsSubmitting(true);
            await new Promise(resolve => setTimeout(resolve, 1500));
            setIsSubmitting(false);
            addToast(langContent.successMessage, 'success');
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-slate-900/70 z-50 flex items-center justify-center p-4 animate-fade-in backdrop-blur-sm"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
        >
            <div
                className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform animate-slide-up"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6 sm:p-8">
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-3">
                            <Mail className="w-8 h-8 text-red-600" />
                            <h2 id="contact-modal-title" className="text-2xl font-bold text-slate-800">{langContent.title}</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1.5 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
                            aria-label="Fermer"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} noValidate className="space-y-5">
                        <div className="grid sm:grid-cols-2 gap-5">
                            <div>
                                <label htmlFor="modal-name" className="flex items-center text-sm font-medium text-slate-700 mb-2">
                                    <User size={16} className="mr-2 text-slate-400"/> {langContent.nameLabel}
                                </label>
                                <input type="text" name="name" id="modal-name" value={formData.name} onChange={handleChange} placeholder={langContent.namePlaceholder} required className={`w-full px-4 py-2.5 bg-white border rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500 ring-red-200' : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500'}`} />
                                {errors.name && <p className="mt-1.5 text-xs text-red-600" role="alert">{errors.name}</p>}
                            </div>
                            <div>
                                <label htmlFor="modal-email" className="flex items-center text-sm font-medium text-slate-700 mb-2">
                                    <Mail size={16} className="mr-2 text-slate-400"/> {langContent.emailLabel}
                                </label>
                                <input type="email" name="email" id="modal-email" value={formData.email} onChange={handleChange} placeholder={langContent.emailPlaceholder} required className={`w-full px-4 py-2.5 bg-white border rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 ring-red-200' : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500'}`} />
                                {errors.email && <p className="mt-1.5 text-xs text-red-600" role="alert">{errors.email}</p>}
                            </div>
                            <div>
                                <label htmlFor="modal-phone" className="flex items-center text-sm font-medium text-slate-700 mb-2">
                                    <Phone size={16} className="mr-2 text-slate-400"/> {langContent.phoneLabel}
                                </label>
                                <input type="tel" name="phone" id="modal-phone" value={formData.phone} onChange={handleChange} placeholder={langContent.phonePlaceholder} className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                            <div>
                                <label htmlFor="modal-company" className="flex items-center text-sm font-medium text-slate-700 mb-2">
                                    <Building size={16} className="mr-2 text-slate-400"/> {langContent.companyLabel}
                                </label>
                                <input type="text" name="company" id="modal-company" value={formData.company} onChange={handleChange} placeholder={langContent.companyPlaceholder} className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="modal-message" className="flex items-center text-sm font-medium text-slate-700 mb-2">
                                <MessageSquare size={16} className="mr-2 text-slate-400"/> {langContent.messageLabel}
                            </label>
                            <textarea name="message" id="modal-message" value={formData.message} onChange={handleChange} placeholder={langContent.messagePlaceholder} rows={4} required className={`w-full px-4 py-2.5 bg-white border rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 ${errors.message ? 'border-red-500 ring-red-200' : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500'}`}></textarea>
                            {errors.message && <p className="mt-1.5 text-xs text-red-600" role="alert">{errors.message}</p>}
                        </div>
                        <div className="pt-2">
                            <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-px disabled:opacity-70 disabled:cursor-wait">
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Envoi en cours...
                                    </>
                                ) : (
                                    <>
                                        <Send size={18} className="mr-2" />
                                        {langContent.submitButton}
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <style>{`
                @keyframes fade-in {
                from { opacity: 0; }
                to { opacity: 1; }
                }
                @keyframes slide-up {
                from { transform: translateY(20px) scale(0.98); opacity: 0; }
                to { transform: translateY(0) scale(1); opacity: 1; }
                }
                .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
                .animate-slide-up { animation: slide-up 0.3s ease-out forwards; }
            `}</style>
        </div>
    );
};


const HomePage: React.FC = () => {
  const [isContactModalOpen, setContactModalOpen] = useState(false);

  return (
    <>
      <Hero />
      <About />
      <Staff />
      <Services />
      <Multiservices />
      <Projects />
      <Videos />
      <FAQ />
      <CtaSection onOpenModal={() => setContactModalOpen(true)} />
      <Contact />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setContactModalOpen(false)} />
    </>
  );
};

export default HomePage;
