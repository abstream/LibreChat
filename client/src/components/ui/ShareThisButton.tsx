import React from 'react';

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
  const sizeClass = {
    small: 'st-btn-small',
    medium: 'st-btn-medium',
    large: 'st-btn-large',
  }[size];

  return (
    <div className={`sharethis-inline-share-buttons ${className} ${sizeClass}`} style={style} />
  );
};
