import { useCallback } from 'react';

interface ShareData {
  title: string;
  text: string;
  url: string;
}

export const useShare = () => {
  const isShareSupported = useCallback(() => {
    return typeof navigator !== 'undefined' && 'share' in navigator;
  }, []);

  const share = useCallback(
    async (data: ShareData) => {
      if (!isShareSupported()) {
        // Fallback: copy to clipboard
        try {
          await navigator.clipboard.writeText(data.url);
          return { success: true, method: 'clipboard' };
        } catch (error) {
          // Final fallback: manual copy
          return { success: false, method: 'manual', error };
        }
      }

      try {
        await navigator.share(data);
        return { success: true, method: 'native' };
      } catch (error) {
        if ((error as Error).name === 'AbortError') {
          // User cancelled the share
          return { success: false, method: 'cancelled' };
        }

        // Fallback to clipboard on error
        try {
          await navigator.clipboard.writeText(data.url);
          return { success: true, method: 'clipboard' };
        } catch (clipboardError) {
          return { success: false, method: 'error', error: clipboardError };
        }
      }
    },
    [isShareSupported],
  );

  return {
    share,
    isShareSupported: isShareSupported(),
  };
};
