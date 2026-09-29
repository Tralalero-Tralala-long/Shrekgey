import React, { useRef, useState } from 'react';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  depth?: number;
  glowColor?: string;
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  className = '',
  depth = 15,
  glowColor = 'rgba(255, 255, 255, 0.08)',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [shinePos, setShinePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -depth;
    const rotY = ((x - centerX) / centerX) * depth;

    setRotateX(rotX);
    setRotateY(rotY);
    setShinePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.15,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setShinePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`card-3d-wrap ${className}`}
    >
      <div
        className="card-3d-inner relative w-full h-full rounded-2xl transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        }}
      >
        {/* Specular glare overlay */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300 z-30"
          style={{
            background: `radial-gradient(circle at ${shinePos.x}% ${shinePos.y}%, ${glowColor} 0%, transparent 60%)`,
            opacity: shinePos.opacity,
          }}
        />
        {children}
      </div>
    </div>
  );
};
