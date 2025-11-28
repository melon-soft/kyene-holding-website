import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import type { Project } from '../types';
import { Search, Loader2, ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { slugify } from '../utils';
import { useRouter } from '../hooks/useRouter';

const getStatusStyle = (status?: string) => {
  switch (status?.toLowerCase()) {
    case 'completed':
    case 'terminé':
      return 'bg-green-600';
    case 'in progress':
    case 'en cours':
      return 'bg-yellow-500';
    case 'upcoming':
    case 'à venir':
      return 'bg-blue-500';
    default:
      return 'bg-slate-500';
  }
};

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const { content } = useContent();
  const { navigate } = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageStatus, setImageStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [useFallback, setUseFallback] = useState(false);
  const fallbackImage = new URL('../constants/images/immobilier3.png', import.meta.url).href;

  useEffect(() => {
    setImageStatus('loading');
    setUseFallback(false);
  }, [currentIndex, project.images]);

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? project.images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const isLastSlide = currentIndex === project.images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (e: React.MouseEvent, slideIndex: number) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex(slideIndex);
  };

  const handleCardClick = () => {
    navigate(`/project/${slugify(project.title)}`);
  };

  const hasMultipleImages = project.images.length > 1;

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white rounded-lg overflow-hidden shadow-lg flex flex-col transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1.5 cursor-pointer animate-on-scroll"
      style={{ transitionDelay: `${index * 100}ms` }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      <div className="relative overflow-hidden h-64 bg-slate-200">
        {project.status && (
          <span className={`absolute top-4 left-4 z-20 px-3 py-1 text-xs font-semibold text-white rounded-full shadow-lg ${getStatusStyle(project.status)}`}>
            {project.status}
          </span>
        )}

        {imageStatus === 'loading' && <div className="absolute inset-0 animate-shimmer pointer-events-none" />}

        {project.images.length > 0 && project.images[currentIndex] ? (
          <>
            <img
              key={(useFallback ? fallbackImage : project.images[currentIndex])}
              src={useFallback ? fallbackImage : project.images[currentIndex]}
              alt={project.title}
              loading="lazy"
              decoding="async"
              onLoad={() => setImageStatus('loaded')}
              onError={() => { setImageStatus('error'); setUseFallback(true); }}
              className={`w-full h-full object-cover transform group-hover:scale-105 transition-all duration-500 ease-in-out ${imageStatus === 'loaded' ? 'opacity-100' : 'opacity-0'
                }`}
            />
            {imageStatus === 'error' && !useFallback && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100 text-slate-500 text-center p-4 pointer-events-none">
                <ImageIcon size={48} className="mb-2 text-slate-400" />
                <p className="font-semibold text-sm">Image unavailable</p>
              </div>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100 text-slate-500">
            <ImageIcon size={48} className="mb-2 text-slate-400" />
            <p className="font-semibold text-sm">No image</p>
          </div>
        )}

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <Search className="text-white" size={28} />
          </div>
        </div>

        {hasMultipleImages && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/30 text-white rounded-full p-1.5 hover:bg-black/50 transition-all z-10 opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={goToNext}
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/30 text-white rounded-full p-1.5 hover:bg-black/50 transition-all z-10 opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
              {project.images.map((_, slideIndex) => (
                <button
                  key={slideIndex}
                  onClick={(e) => goToSlide(e, slideIndex)}
                  className={`h-2 w-2 rounded-full transition-colors ${currentIndex === slideIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
                    }`}
                  aria-label={`Go to image ${slideIndex + 1}`}
                ></button>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <p className="text-sm font-semibold text-red-600 uppercase">{project.category}</p>
        <h4 className="text-xl font-bold mt-1 text-slate-900 flex-grow">{project.title}</h4>
        <div className="mt-4 pt-4 border-t border-slate-200">
          <div className="inline-block bg-red-600 text-white px-4 py-2 rounded-full font-semibold text-sm group-hover:bg-red-700 transition-colors">
            {content.projects.readMore} &rarr;
          </div>
        </div>
      </div>
    </div>
  );
};


const Projects: React.FC = () => {
  const { content } = useContent();
  const { projects: langContent, services } = content;
  const [selectedCategory, setSelectedCategory] = useState<string>(langContent.allProjects);
  const [isLoading, setIsLoading] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  useScrollAnimation(sectionRef, { threshold: 0.05 });

  const INITIAL_PROJECT_COUNT = 6;

  const categories = useMemo(() => {
    return [langContent.allProjects, ...services.list.map(s => s.title)];
  }, [langContent.allProjects, services.list]);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === langContent.allProjects) {
      return langContent.list;
    }
    return langContent.list.filter(project => project.category === selectedCategory);
  }, [selectedCategory, langContent]);

  const displayedProjects = useMemo(() => {
    if (showAllProjects) {
      return filteredProjects;
    }
    return filteredProjects.slice(0, INITIAL_PROJECT_COUNT);
  }, [showAllProjects, filteredProjects]);

  const handleCategoryClick = (category: string) => {
    setIsLoading(true);
    // Simulate async data fetching visual feedback
    setTimeout(() => {
      setSelectedCategory(category);
      setShowAllProjects(false);
      setIsLoading(false);
    }, 500);
  };

  return (
    <>
      <section id="projects" ref={sectionRef} className="py-20 lg:py-32 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="text-red-600 font-semibold uppercase mb-2 animate-on-scroll">{langContent.subtitle}</h3>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 animate-on-scroll" style={{ transitionDelay: '100ms' }}>{langContent.title}</h2>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-12 animate-on-scroll" style={{ transitionDelay: '200ms' }}>
            <div className="flex justify-center flex-wrap gap-3">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  disabled={isLoading}
                  className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 disabled:opacity-75 disabled:cursor-not-allowed ${selectedCategory === category
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="relative min-h-[300px]">
            {isLoading && (
              <div className="absolute inset-0 bg-slate-50/70 flex items-center justify-center z-10 rounded-lg">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
              </div>
            )}
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-300 ease-in-out ${isLoading ? 'opacity-30' : 'opacity-100'}`}>
              {displayedProjects.length === 0 && !isLoading && (
                <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-16">
                  <p className="text-xl text-slate-500 font-semibold mb-2">Aucun projet trouvé</p>
                  <p className="text-slate-400">Essayez de sélectionner une autre catégorie.</p>
                </div>
              )}
              {displayedProjects.map((project, index) => (
                <ProjectCard
                  key={`${project.title}-${index}`}
                  project={project}
                  index={index}
                />
              )
              )}
            </div>
          </div>

          {filteredProjects.length > INITIAL_PROJECT_COUNT && !showAllProjects && (
            <div className="text-center mt-16">
              <button
                onClick={() => setShowAllProjects(true)}
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-full font-bold hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-105 shadow-md">
                {langContent.cta}
              </button>
            </div>
          )}
        </div>
      </section>

      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          position: relative;
          overflow: hidden;
          background-color: #e2e8f0; /* slate-200 */
        }
        .animate-shimmer::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          transform: translateX(-100%);
          background-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0,
            rgba(255, 255, 255, 0.2) 20%,
            rgba(255, 255, 255, 0.5) 60%,
            rgba(255, 255, 255, 0)
          );
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </>
  );
};

export default Projects;