import React from 'react';
import ShareButton from './ShareButton';

interface StickyShareButtonProps {
  title: string;
  text: string;
  url?: string;
}

const StickyShareButton: React.FC<StickyShareButtonProps> = ({ title, text, url }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <ShareButton
        title={title}
        text={text}
        url={url}
        className="rounded-full bg-blue-600 px-6 py-3 text-white shadow-lg transition-all duration-200 hover:bg-blue-700 hover:shadow-xl"
      />
    </div>
  );
};

export default StickyShareButton;
