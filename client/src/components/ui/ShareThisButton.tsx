import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface ShareThisButtonProps {
  className?: string;
  style?: React.CSSProperties;
  size?: 'small' | 'medium' | 'large';
}

export const ShareThisButton: React.FC<ShareThisButtonProps> = ({
  className = '',
  style = {},
  size = 'medium',
}) => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);

  const sizeClass = {
    small: 'st-btn-small',
    medium: 'st-btn-medium',
    large: 'st-btn-large',
  }[size];

  useEffect(() => {
    // Force ShareThis to reinitialize when location changes
    const timer = setTimeout(() => {
      if (window.__sharethis__ && window.__sharethis__.load && containerRef.current) {
        // Clear existing buttons first
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
        }

        // Reinitialize ShareThis
        window.__sharethis__.load('sop', {
          property: '687a7803e34fde681160ccd1',
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div
      ref={containerRef}
      className={`sharethis-inline-share-buttons ${className} ${sizeClass}`}
      style={style}
    />
  );
};
