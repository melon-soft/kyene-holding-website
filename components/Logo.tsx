import React from 'react';
import { useContent } from '../context/ContentContext';

interface LogoProps {
  className?: string;
  [key: string]: any;
}

const Logo: React.FC<LogoProps> = (props) => {
  const { content } = useContent();
  return (
    <img
      src={content.logoUrl}
      alt="K-YENE Holding Logo"
      loading="eager"
      decoding="async"
      {...props}
    />
  );
};

export default Logo;