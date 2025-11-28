import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { useRouter } from '../hooks/useRouter';
import { useContent } from '../context/ContentContext';
import { slugify } from '../utils';
import type { Project } from '../types';
import { X, ArrowLeft, ChevronLeft, ChevronRight, Video, Image as ImageIcon, Play, Pause, Volume2, Volume1, VolumeX, Maximize, Minimize, Loader2 } from 'lucide-react';

interface ProjectPageProps {
  slug: string;
}

const ProjectNotFound = () => {
    const { content } = useContent();
    const { navigate } = useRouter();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center py-20 bg-slate-50">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">Projet non trouvé</h1>
            <p className="text-lg text-slate-600 mb-8 max-w-md">Désolé, le projet que vous recherchez n'existe pas ou a été déplacé.</p>
            <button onClick={() => navigate('/#projects')} className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition-all">
                <ArrowLeft size={20} />
                {content.projects.page.backToProjects}
            </button>
        </div>
    );
};


const ProjectPage: React.FC<ProjectPageProps> = ({ slug }) => {
  const { content, isLoading } = useContent();
  const { navigate } = useRouter();

  const project = useMemo(() => {
    if (isLoading || !content) return null;
    return content.projects.list.find(p => slugify(p.title) === slug);
  }, [slug, isLoading, content]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  
  const isCompleted = useMemo(() => {
    if (!project) return false;
    return ['terminé', 'completed'].includes(project.status?.toLowerCase() || '');
  }, [project]);
  
  const hasVideo = useMemo(() => {
    if (!project) return false;
    return !!project.videoUrl && isCompleted;
  }, [project, isCompleted]);
  
  const hasAdditionalVideo = useMemo(() => {
    if (!project) return false;
    return !!project.additionalVideoUrl && isCompleted;
  }, [project, isCompleted]);

  const hasImages = useMemo(() => {
    if (!project) return false;
    return project.images && project.images.length > 0;
  }, [project]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [imageStatus, setImageStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [videoStatus, setVideoStatus] = useState<'idle' | 'loading' | 'playing' | 'paused' | 'error'>('idle');
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  const hasMultipleImages = useMemo(() => project?.images && project.images.length > 1, [project]);
  
  const allProjects = content?.projects?.list ?? [];

  const relatedProjects = useMemo(() => {
    if (!project || !allProjects) return [];
    return allProjects.filter(p => p.title !== project.title && p.category === project.category).slice(0, 3);
  }, [project, allProjects]);

  useEffect(() => {
    if (project) {
        setShowVideo(hasVideo);
        setCurrentIndex(0);
        setCurrentVideoIndex(0);
        setImageStatus('loading');
        setVideoStatus('idle');
    }
  }, [project, hasVideo]);

  const getCurrentVideoUrl = useCallback(() => {
    if (!project) return '';
    return (currentVideoIndex === 0 ? project.videoUrl : project.additionalVideoUrl) || '';
  }, [currentVideoIndex, project]);
  
  useEffect(() => {
    if (showVideo && hasVideo) {
      const url = getCurrentVideoUrl();
      setVideoSrc(url || null);
      setVideoStatus(url ? 'loading' : 'error');
    } else {
      setVideoSrc(null);
    }
  }, [showVideo, hasVideo, getCurrentVideoUrl]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement || !videoSrc) return;

    let playAttempted = false;

    const tryPlay = () => {
        if (playAttempted) return;
        playAttempted = true;
        
        const playPromise = videoElement.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                if (error.name !== "AbortError") {
                    console.warn("Autoplay was prevented:", error.message);
                    setVideoStatus('paused');
                }
            });
        }
    };

    const handleCanPlay = () => {
      tryPlay();
    };

    videoElement.addEventListener('canplay', handleCanPlay);

    // Initial check in case canplay already fired
    if (videoElement.readyState >= 3) {
        handleCanPlay();
    }

    return () => {
      if (videoElement) {
        videoElement.pause();
        // Reset src to prevent background loading on component unmount
        videoElement.removeAttribute('src'); 
        videoElement.load();
        videoElement.removeEventListener('canplay', handleCanPlay);
      }
    };
  }, [videoSrc, showVideo]);


  const goToPreviousImage = () => setCurrentIndex(prev => (prev === 0 ? (project?.images.length || 1) - 1 : prev - 1));
  const goToNextImage = () => setCurrentIndex(prev => (prev === (project?.images.length || 1) - 1 ? 0 : prev + 1));
  
  const togglePlayPause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(err => {
        console.error("Video play failed:", err.message);
        setVideoStatus('error');
      });
    } else {
      video.pause();
    }
  }, []);

  const toggleFullScreen = useCallback(() => {
    if (!document.fullscreenElement) {
      videoContainerRef.current?.requestFullscreen().catch(err => {
        console.error("Error attempting to enable full-screen mode:", err.message);
      });
    } else {
      document.exitFullscreen().catch(err => {
        console.error("Error attempting to exit full-screen mode:", err.message);
      });
    }
  }, []);
  
  useEffect(() => {
    const onFullScreenChange = () => setIsFullScreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullScreenChange);
  }, []);

  if (isLoading) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
            <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
        </div>
    );
  }
  
  if (!project) {
    return <ProjectNotFound />;
  }
  
  const langContent = content.projects.page;

  const onSelectProject = (relatedProject: Project) => {
    navigate(`/project/${slugify(relatedProject.title)}`);
  };

  const getStatusStyle = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'completed': case 'terminé': return 'bg-green-100 text-green-800';
      case 'in progress': case 'en cours': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };
  
  const handleTimeUpdate = () => {
    if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
  };
  
  const handleLoadedMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  };

  return (
    <section className="py-20 lg:py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <button onClick={() => navigate('/#projects')} className="inline-flex items-center gap-2 text-red-600 hover:text-red-800 font-semibold mb-8 transition-colors">
            <ArrowLeft size={20} />
            {langContent.backToProjects}
          </button>
          
          <div className="bg-white rounded-lg shadow-2xl w-full overflow-hidden">
             <div className="relative bg-black">
                <div className="relative w-full h-64 md:h-80 overflow-hidden">
                    <div className={`absolute inset-0 transition-opacity duration-500 ${showVideo && hasVideo ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        <div ref={videoContainerRef} className="w-full h-full bg-black relative">
                            {videoSrc && <video ref={videoRef} src={videoSrc} key={videoSrc} className="w-full h-full object-contain" muted loop playsInline onClick={togglePlayPause} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata} onPlaying={() => setVideoStatus('playing')} onPause={() => setVideoStatus('paused')} onWaiting={() => setVideoStatus('loading')} onError={() => setVideoStatus('error')} />}
                            {videoStatus === 'loading' && <div className="absolute inset-0 flex items-center justify-center bg-black/50"><Loader2 size={48} className="text-white animate-spin" /></div>}
                            {videoStatus === 'error' && (
                               <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800 text-slate-300">
                                    <Video size={48} className="mb-2 text-slate-500" />
                                    <p>Video could not be loaded.</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={`absolute inset-0 transition-opacity duration-500 ${!showVideo ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        {!hasImages ? (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-500">
                                <ImageIcon size={48} className="mb-2 text-slate-400" />
                                <p className="font-semibold text-sm">No image available</p>
                            </div>
                        ) : (
                            <>
                                {imageStatus === 'loading' && <div className="absolute inset-0 bg-slate-200 animate-shimmer" />}
                                <img key={project.images[currentIndex]} src={project.images[currentIndex]} alt={`${project.title} ${currentIndex + 1}`} loading="lazy" decoding="async" onLoad={() => setImageStatus('loaded')} onError={() => setImageStatus('error')} className={`w-full h-full object-cover transition-opacity duration-300 ${imageStatus === 'loaded' ? 'opacity-100' : 'opacity-0'}`} />
                                {imageStatus === 'error' && <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100 text-slate-500"><ImageIcon size={48} className="mb-2" /><p>Image unavailable</p></div>}
                                {hasMultipleImages && <>
                                    <button onClick={goToPreviousImage} className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50"><ChevronLeft size={24} /></button>
                                    <button onClick={goToNextImage} className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50"><ChevronRight size={24} /></button>
                                </>}
                            </>
                        )}
                    </div>
                </div>
                {hasVideo && hasImages && <div className="absolute top-4 left-4 flex space-x-1 z-10 p-1 bg-black/20 rounded-full">
                    <button onClick={() => setShowVideo(true)} className={`p-2 rounded-full ${showVideo ? 'bg-red-600 text-white' : 'text-white'}`}><Video size={20} /></button>
                    <button onClick={() => setShowVideo(false)} className={`p-2 rounded-full ${!showVideo ? 'bg-red-600 text-white' : 'text-white'}`}><ImageIcon size={20} /></button>
                </div>}
            </div>
            <div className="p-8">
                <p className="text-sm font-semibold text-red-600 uppercase mb-1">{project.category}</p>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">{project.title}</h2>
                {project.status && <span className={`inline-block px-4 py-1.5 text-sm font-semibold rounded-full mb-4 ${getStatusStyle(project.status)}`}>{project.status}</span>}
                <p className="text-slate-600 leading-relaxed mb-6">{project.description}</p>
                <div className="space-y-6">
                    <div><h3 className="text-xl font-bold text-slate-800 mb-2 border-b-2 border-slate-200 pb-2">{langContent.challenges}</h3><p className="text-slate-600">{project.challenges}</p></div>
                    <div><h3 className="text-xl font-bold text-slate-800 mb-2 border-b-2 border-slate-200 pb-2">{langContent.solution}</h3><p className="text-slate-600">{project.solution}</p></div>
                </div>
                {relatedProjects.length > 0 && <div className="mt-8 pt-8 -mx-8 px-8 pb-8 bg-slate-50 border-t border-slate-200">
                    <h3 className="text-xl font-bold text-slate-800 mb-4">{langContent.relatedProjects}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {relatedProjects.map(p => (
                          <button key={p.title} onClick={() => onSelectProject(p)} className="group text-left rounded-lg bg-white shadow-md hover:shadow-xl transition-all overflow-hidden">
                            <div className="h-32 overflow-hidden bg-slate-200 flex items-center justify-center">
                              {p.images && p.images.length > 0 ? (
                                <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" decoding="async" />
                              ) : (
                                <ImageIcon className="w-10 h-10 text-slate-400" />
                              )}
                            </div>
                            <div className="p-4">
                                <p className="text-xs font-semibold text-red-600 uppercase">{p.category}</p>
                                <h4 className="text-sm font-bold truncate text-slate-800 mt-1">{p.title}</h4>
                            </div>
                          </button>
                        ))}
                    </div>
                </div>}
            </div>
          </div>
        </div>
      </div>
       <style>{`
        @keyframes shimmer { 100% { transform: translateX(100%); } }
        .animate-shimmer { position: relative; overflow: hidden; background-color: #e2e8f0; }
        .animate-shimmer::after { content: ''; position: absolute; top: 0; right: 0; bottom: 0; left: 0; transform: translateX(-100%); background-image: linear-gradient(90deg, rgba(255,255,255,0) 0, rgba(255,255,255,0.2) 20%, rgba(255,255,255,0.5) 60%, rgba(255,255,255,0)); animation: shimmer 1.5s infinite; }
      `}</style>
    </section>
  );
};

export default ProjectPage;