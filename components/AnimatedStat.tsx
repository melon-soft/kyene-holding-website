
import React, { useState, useEffect, useRef } from 'react';

interface AnimatedStatProps {
  finalValue: string; // e.g., "9+"
  label: string;
  isVisible: boolean;
}

const AnimatedStat: React.FC<AnimatedStatProps> = ({ finalValue, label, isVisible }) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);
  
  const endValue = parseInt(finalValue, 10);
  const suffix = finalValue.replace(endValue.toString(), '');

  useEffect(() => {
    if (isVisible && !hasAnimated.current) {
        hasAnimated.current = true;
        let startTime: number | null = null;
        const duration = 2000; // 2 seconds

        const animation = (currentTime: number) => {
            if (startTime === null) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const currentCount = Math.floor(progress * endValue);
            setCount(currentCount);

            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    }
  }, [isVisible, endValue]);

  return (
    <div>
      <p className="text-3xl lg:text-4xl font-bold text-red-600">{count}{suffix}</p>
      <p className="text-sm text-slate-500 mt-1">{label}</p>
    </div>
  );
};

export default AnimatedStat;