import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { Content, Language } from '../types';
import { content as staticContent } from '../constants/content'; // Fallback
import { useLanguage } from './LanguageContext';

interface ContentContextType {
  content: Content;
  language: Language;
  isLoading: boolean;
  error: string | null;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

// A deep merge function to combine static fallback with dynamic data
const mergeDeep = (target: any, source: any) => {
  const output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target))
          Object.assign(output, { [key]: source[key] });
        else
          output[key] = mergeDeep(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

const isObject = (item: any) => {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

const resolveImage = (name: string) => new URL('../constants/images/' + name, import.meta.url).href;

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<{[key: string]: Content}>({ fr: staticContent.fr, en: staticContent.en });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data: projects, error: projectsError } = await supabase.from('projects').select('*');
        if (projectsError) throw { ...projectsError, table: 'projects' };

        // Ensure nested array properties are always arrays, not null, to prevent runtime errors.
        const processedProjects = projects.map(p => ({
            ...p,
            images: (p.images ?? []).map((u: string) => typeof u === 'string' && u.startsWith('images/') ? resolveImage(u.replace('images/','')) : u),
            tags: p.tags ?? [],
        }));

        const { data: services, error: servicesError } = await supabase.from('services').select('*');
        if (servicesError) throw { ...servicesError, table: 'services' };

        const { data: faq, error: faqError } = await supabase.from('faq').select('*');
        if (faqError) throw { ...faqError, table: 'faq' };

        // Reconstruct the full content object
        const dynamicContent = {
            fr: {
                projects: { ...staticContent.fr.projects, list: processedProjects.filter(p => p.language === 'fr') },
                services: { ...staticContent.fr.services, list: services.filter(s => s.language === 'fr') },
                faq: { ...staticContent.fr.faq, list: faq.filter(f => f.language === 'fr') },
            },
            en: {
                projects: { ...staticContent.en.projects, list: processedProjects.filter(p => p.language === 'en') },
                services: { ...staticContent.en.services, list: services.filter(s => s.language === 'en') },
                faq: { ...staticContent.en.faq, list: faq.filter(f => f.language === 'en') },
            }
        };

        // Deep merge with static content as a fallback for text not in the DB yet
        const finalContent = {
            fr: mergeDeep(staticContent.fr, dynamicContent.fr),
            en: mergeDeep(staticContent.en, dynamicContent.en),
        };
        
        setContent(finalContent as any);

      } catch (err: any) {
        console.error("Error fetching from Supabase:", err);
        const tableName = err.table ? ` on table '${err.table}'` : '';
        const errorMessage = err.message || JSON.stringify(err);
        setError(`Failed to load dynamic content: ${errorMessage}${tableName}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  const { language } = useLanguage();

  return (
    <ContentContext.Provider value={{ content: content[language], language, isLoading, error }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = (): ContentContextType => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};