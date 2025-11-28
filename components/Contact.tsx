import React, { useState, useRef } from 'react';
import { useContent } from '../context/ContentContext';
import { MapPin, Clock, Phone, Send, PhoneCall, Loader2 } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useToast } from '../context/ToastContext';

const Contact: React.FC = () => {
    const { content } = useContent();
    const { addToast } = useToast();
    const langContent = content.contact;
    const sectionRef = useRef<HTMLDivElement>(null);
    useScrollAnimation(sectionRef, { threshold: 0.05 });

    const { location, addressCard, hoursCard, contactCard, form: formContent } = langContent;
    
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const validate = () => {
        const newErrors = { name: '', email: '', message: '' };
        let isValid = true;
        
        if (!formData.name.trim()) {
            newErrors.name = formContent.validation.nameRequired;
            isValid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = formContent.validation.emailRequired;
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = formContent.validation.emailInvalid;
            isValid = false;
        }

        if (!formData.message.trim()) {
            newErrors.message = formContent.validation.messageRequired;
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
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            setIsSubmitting(false);

            addToast(formContent.successMessage, 'success');
            setFormData({ name: '', email: '', message: '' });
            setErrors({ name: '', email: '', message: '' });
        }
    };

    const handleReset = () => {
        setFormData({ name: '', email: '', message: '' });
        setErrors({ name: '', email: '', message: '' });
    };

    return (
        <section id="contact" ref={sectionRef} className="py-20 lg:py-32 bg-slate-50 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Location Section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 animate-on-scroll">{location.title}</h2>
                    <p className="text-lg text-slate-600 animate-on-scroll" style={{ transitionDelay: '100ms' }}>{location.subtitle}</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start mb-24">
                    <div className="h-96 lg:h-full min-h-[450px] rounded-2xl overflow-hidden shadow-2xl animate-on-scroll" style={{ transitionDelay: '200ms' }}>
                         <iframe
                            src="https://maps.google.com/maps?q=Avenue%20des%20Nations-Unies%2C%20Gombe%2C%20Kinshasa&t=&z=15&ie=UTF8&iwloc=&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Kyene Holdings Location"
                        ></iframe>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg animate-on-scroll" style={{ transitionDelay: '300ms' }}>
                            <div className="flex items-start gap-5">
                                <div className="flex-shrink-0 w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
                                    <MapPin className="w-7 h-7 text-red-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{addressCard.title}</h3>
                                    <p className="text-slate-600">{addressCard.address}</p>
                                    <p className="text-slate-600">{addressCard.country}</p>
                                    <a href={addressCard.button.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 bg-red-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-red-700 transition-all shadow-md">
                                        <Send size={16} className="-rotate-45" /> {addressCard.button.text}
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg animate-on-scroll" style={{ transitionDelay: '400ms' }}>
                            <div className="flex items-start gap-5">
                                <div className="flex-shrink-0 w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
                                    <Clock className="w-7 h-7 text-red-600" />
                                </div>
                                <div className="w-full">
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{hoursCard.title}</h3>
                                    <ul className="space-y-2 text-slate-600 text-sm">
                                        {hoursCard.hours.map(h => (
                                            <li key={h.day} className="flex justify-between items-center border-b border-slate-100 pb-2 last:border-b-0">
                                                <span>{h.day}</span>
                                                <span className="font-medium text-slate-800">{h.time}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg animate-on-scroll" style={{ transitionDelay: '500ms' }}>
                            <div className="flex items-start gap-5">
                                <div className="flex-shrink-0 w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
                                    <Phone className="w-7 h-7 text-red-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{contactCard.title}</h3>
                                    <p className="text-slate-600">{contactCard.phone}</p>
                                    <p className="text-slate-600">{contactCard.email}</p>
                                    <a href={contactCard.button.url} className="inline-flex items-center gap-2 mt-4 bg-slate-800 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-900 transition-all shadow-md">
                                        <PhoneCall size={16} /> {contactCard.button.text}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 animate-on-scroll" style={{ transitionDelay: '100ms' }}>{formContent.title}</h2>
                </div>

                <form onSubmit={handleSubmit} noValidate className="mt-12 max-w-3xl mx-auto space-y-6 animate-on-scroll" style={{ transitionDelay: '200ms' }}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">{formContent.nameLabel}</label>
                        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} placeholder={formContent.namePlaceholder} aria-invalid={!!errors.name} required className={`w-full px-4 py-3 bg-white border rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500'}`} />
                        {errors.name && <p className="mt-2 text-sm text-red-600" role="alert">{errors.name}</p>}
                    </div>
                     <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">{formContent.emailLabel}</label>
                        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} placeholder={formContent.emailPlaceholder} aria-invalid={!!errors.email} required className={`w-full px-4 py-3 bg-white border rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500'}`} />
                        {errors.email && <p className="mt-2 text-sm text-red-600" role="alert">{errors.email}</p>}
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">{formContent.messageLabel}</label>
                        <textarea name="message" id="message" value={formData.message} onChange={handleChange} placeholder={formContent.messagePlaceholder} rows={5} aria-invalid={!!errors.message} required className={`w-full px-4 py-3 bg-white border rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 ${errors.message ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500'}`}></textarea>
                        {errors.message && <p className="mt-2 text-sm text-red-600" role="alert">{errors.message}</p>}
                    </div>
                    <div className="text-center flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button type="button" onClick={handleReset} disabled={isSubmitting} className="bg-slate-200 text-slate-700 px-8 py-3 rounded-full font-semibold hover:bg-slate-300 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-px w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed">
                            {formContent.resetButton}
                        </button>
                        <button type="submit" disabled={isSubmitting} className="flex items-center justify-center bg-red-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-px w-full sm:w-auto disabled:opacity-50 disabled:cursor-wait">
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                formContent.submitButton
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Contact;