import React, { useState } from 'react';
import { Share2 } from 'lucide-react';
import { Button } from '~/components/ui';
import { useShare } from '~/hooks/useShare';

interface ShareButtonProps {
  title: string;
  text: string;
  url?: string;
  className?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({
  title,
  text,
  url = window.location.href,
  className = '',
}) => {
  const { share, isShareSupported } = useShare();
  const [feedback, setFeedback] = useState<string>('');

  const handleShare = async () => {
    const result = await share({ title, text, url });

    if (result.success) {
      if (result.method === 'clipboard') {
        setFeedback('Link copied!');
      } else if (result.method === 'native') {
        setFeedback('Shared!');
      }
    } else {
      if (result.method === 'cancelled') {
        return; // Don't show error for user cancellation
      }
      setFeedback('Failed to share');
    }

    // Clear feedback after 2 seconds
    setTimeout(() => setFeedback(''), 2000);
  };

  return (
    <div className="relative">
      <Button
        onClick={handleShare}
        className={`flex items-center gap-2 ${className}`}
        variant="outline"
      >
        <Share2 className="h-4 w-4" />
        {isShareSupported ? 'Share' : 'Copy Link'}
      </Button>

      {feedback && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 rounded bg-black px-2 py-1 text-xs text-white dark:bg-white dark:text-black">
          {feedback}
        </div>
      )}
    </div>
  );
};

export default ShareButton;
