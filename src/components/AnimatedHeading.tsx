import React, { useEffect, useState } from 'react';

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  charDelay?: number;
  initialDelay?: number;
  duration?: number;
}

export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  text,
  className = 'text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-4',
  charDelay = 30,
  initialDelay = 200,
  duration = 500,
}) => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimated(true);
    }, initialDelay);
    return () => clearTimeout(timer);
  }, [initialDelay]);

  const lines = text.split('\n');

  return (
    <h1
      className={className}
      style={{ letterSpacing: '-0.04em' }}
    >
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block">
          {Array.from(line).map((char, charIndex) => {
            const delay = (lineIndex * line.length * charDelay) + (charIndex * charDelay);
            return (
              <span
                key={charIndex}
                className="inline-block transition-all ease-out"
                style={{
                  opacity: animated ? 1 : 0,
                  transform: animated ? 'translateX(0)' : 'translateX(-18px)',
                  transitionDuration: `${duration}ms`,
                  transitionDelay: `${delay}ms`,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
};
