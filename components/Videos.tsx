import React, { useState, useRef, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import type { Video } from '../types';
import { Play, ExternalLink, Video as VideoIcon, X } from 'lucide-react';

const VideoModal: React.FC<{ videoUrl: string | null; isOpen: boolean; onClose: () => void }> = ({ videoUrl, isOpen, onClose }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            videoRef.current?.play().catch(error => {
                console.error("Video autoplay failed:", error);
            });
        } else {
            document.body.style.overflow = 'auto';
            videoRef.current?.pause();
        }
    }, [isOpen]);

    if (!isOpen || !videoUrl) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
        >
            <div className="relative w-full max-w-4xl bg-black rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <button 
                    onClick={onClose} 
                    className="absolute -top-10 -right-2 text-white/80 hover:text-white transition-colors z-10"
                    aria-label="Close video player"
                >
                    <X size={32} />
                </button>
                <div className="aspect-w-16 aspect-h-9">
                    <video ref={videoRef} src={videoUrl} controls autoPlay className="w-full h-full rounded-lg" />
                </div>
            </div>
             <style>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
                .aspect-w-16 { position: relative; padding-bottom: 56.25%; }
                .aspect-h-9 > * { position: absolute; height: 100%; width: 100%; top: 0; left: 0; }
            `}</style>
        </div>
    );
};

const VideoCard: React.FC<{ video: Video; index: number; onPlay: (videoUrl: string) => void }> = ({ video, index, onPlay }) => {
    const { content } = useContent();
    const { watch_video, views_suffix, duration_prefix } = content.videos;

    return (
        <div 
            className="group bg-slate-800/50 rounded-lg overflow-hidden shadow-lg flex flex-col transition-all duration-300 ease-in-out hover:shadow-blue-900/50 hover:-translate-y-1.5 cursor-pointer animate-on-scroll"
            style={{ transitionDelay: `${index * 100}ms` }}
            onClick={() => onPlay(video.videoUrl)}
        >
            <div className="relative overflow-hidden h-52 bg-slate-700">
                <img 
                    src={video.thumbnailUrl}
                    alt={video.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
                <div className="absolute inset-0 bg-black/40 transition-colors"></div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-600/80 rounded-full flex items-center justify-center transform scale-90 group-hover:scale-100 group-hover:bg-red-600 transition-all duration-300">
                        <Play className="text-white" size={32} style={{ marginLeft: '4px' }}/>
                    </div>
                </div>

                <span className="absolute top-3 left-3 bg-black/50 text-white text-xs font-semibold px-2 py-1 rounded">
                    {video.category}
                </span>
                <span className="absolute bottom-3 right-3 bg-black/50 text-white text-xs font-semibold px-2 py-1 rounded">
                    {video.duration}
                </span>
            </div>
            <div className="p-5 flex-grow flex flex-col">
                <h4 className="text-lg font-bold text-white mb-2 flex-grow">{video.title}</h4>
                <div className="flex justify-between items-center text-slate-400 text-sm mb-4">
                    <span>{video.views} {views_suffix}</span>
                    <span>{duration_prefix} {video.duration}</span>
                </div>
                <div className="mt-auto pt-4 border-t border-slate-700">
                   <span className="flex items-center text-red-400 font-semibold group-hover:text-red-300 transition-colors">
                        {watch_video} <ExternalLink className="ml-2" size={16} />
                   </span>
                </div>
            </div>
        </div>
    );
};

const Videos: React.FC = () => {
  const { content } = useContent();
  const sectionRef = useRef<HTMLElement>(null);
  useScrollAnimation(sectionRef, { threshold: 0.1 });

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);

  const handlePlayVideo = (videoUrl: string) => {
    setSelectedVideoUrl(videoUrl);
    setModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedVideoUrl(null);
  };

  const { videos: langContent } = content;

  return (
    <section id="videos" ref={sectionRef} className="py-20 lg:py-32 bg-[#0D1F3C]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 animate-on-scroll">{langContent.title}</h2>
          <p className="text-lg text-slate-300 mb-16 animate-on-scroll" style={{ transitionDelay: '100ms' }}>
            {langContent.subtitle}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {langContent.list.map((video, index) => (
                <VideoCard key={index} video={video} index={index} onPlay={handlePlayVideo} />
            ))}
        </div>
      </div>
      <VideoModal isOpen={modalOpen} onClose={handleCloseModal} videoUrl={selectedVideoUrl} />
    </section>
  );
};

export default Videos;