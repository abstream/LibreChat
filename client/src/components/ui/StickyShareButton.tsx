import React from 'react';
import ShareButton from './ShareButton';

interface StickyShareButtonProps {
  title: string;
  text: string;
  url?: string;
}

const StickyShareButton: React.FC<StickyShareButtonProps> = ({ title, text, url }) => {
  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transform">
      <ShareButton
        title={title}
        text={text}
        url={url}
        className="rounded-full bg-blue-400 px-12 py-3 text-white shadow-lg transition-all duration-200 hover:bg-blue-400 hover:shadow-xl"
      />
    </div>
  );
};

export default StickyShareButton;
