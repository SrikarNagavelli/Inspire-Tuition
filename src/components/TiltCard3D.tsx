import { useRef, useState, type MouseEvent, type ReactNode } from 'react';

interface TiltCard3DProps {
  children: ReactNode;
  className?: string;
  maxTiltDeg?: number;
}

/**
 * Lightweight GPU-composited 3D tilt wrapper.
 * Applies gentle perspective tilt only on desktop pointer devices and
 * automatically stays flat on touch devices or when prefers-reduced-motion is enabled.
 */
export function TiltCard3D({
  children,
  className = '',
  maxTiltDeg = 3.2,
}: TiltCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState<string>(
    'perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)'
  );
  const [isHovered, setIsHovered] = useState(false);

  const canTilt = () => {
    if (typeof window === 'undefined') return false;
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const finePointer = window.matchMedia(
      '(hover: hover) and (pointer: fine)'
    ).matches;
    return !prefersReduced && finePointer;
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!canTilt() || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * 2 * maxTiltDeg;
    const rotateX = (0.5 - y) * 2 * maxTiltDeg;

    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translate3d(0, -4px, 0)`
    );
  };

  const handleMouseEnter = () => {
    if (!canTilt()) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransformStyle(
      'perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)'
    );
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: isHovered
          ? 'transform 120ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 220ms ease'
          : 'transform 320ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 260ms ease',
        willChange: isHovered ? 'transform' : 'auto',
      }}
      className={className}
    >
      {children}
    </div>
  );
}
