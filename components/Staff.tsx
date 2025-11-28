import React, { useRef } from 'react';
import { useContent } from '../context/ContentContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Linkedin, Twitter, Facebook } from 'lucide-react';
import type { StaffMember } from '../types';

const socialIconMap: { [key: string]: React.ComponentType<{ size?: number }> } = {
  linkedin: Linkedin,
  twitter: Twitter,
  facebook: Facebook,
};

interface StaffCardProps {
    member: StaffMember;
    index: number;
}

const StaffCard: React.FC<StaffCardProps> = ({ member, index }) => {
  return (
    <div
      className="text-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-on-scroll"
      style={{ transitionDelay: `${200 + index * 100}ms` }}
    >
      <img
        className="w-32 h-32 mx-auto rounded-full object-cover mb-4 shadow-md"
        src={member.images[0]}
        alt={member.name}
        loading="lazy"
        decoding="async"
      />
      <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
      <p className="text-red-600 font-medium text-sm mb-4">{member.role}</p>
      <div className="flex justify-center space-x-3">
        {member.socials.map((social) => {
          const Icon = socialIconMap[social.name];
          return (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-red-600 transition-colors"
              aria-label={`Visit ${member.name}'s ${social.name}`}
            >
              {Icon && <Icon size={20} />}
            </a>
          );
        })}
      </div>
    </div>
  );
};

const Staff: React.FC = () => {
  const { content } = useContent();
  const sectionRef = useRef<HTMLDivElement>(null);
  useScrollAnimation(sectionRef, { threshold: 0.1 });

  const { staff: langContent } = content;

  return (
    <section id="staff" ref={sectionRef} className="py-20 lg:py-32 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h3 className="text-red-600 font-semibold uppercase mb-2 animate-on-scroll">{langContent.subtitle}</h3>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 animate-on-scroll" style={{ transitionDelay: '100ms' }}>
            {langContent.title}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {langContent.list.map((member, index) => (
            <StaffCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Staff;
