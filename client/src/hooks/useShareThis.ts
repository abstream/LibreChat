import { useEffect } from 'react';

interface UseShareThisOptions {
  enabled: boolean;
}

export const useShareThis = ({ enabled }: UseShareThisOptions) => {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    // Check if ShareThis script is already loaded
    if (window.__sharethis__ || document.querySelector('script[src*="sharethis.com"]')) {
      return;
    }

    // Create and append the ShareThis script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src =
      'https://platform-api.sharethis.com/js/sharethis.js#property=687a7803e34fde681160ccd1&product=sop';
    script.async = true;

    // Add script to head
    document.head.appendChild(script);

    // Cleanup function to remove script when component unmounts or enabled becomes false
    return () => {
      const existingScript = document.querySelector('script[src*="sharethis.com"]');
      if (existingScript) {
        existingScript.remove();
      }

      // Clean up ShareThis global objects if they exist
      if (window.__sharethis__) {
        delete window.__sharethis__;
      }

      // Remove ShareThis widgets if they exist
      const shareThisElements = document.querySelectorAll('[data-network]');
      shareThisElements.forEach((element) => element.remove());
    };
  }, [enabled]);
};

// Type declaration for ShareThis global
declare global {
  interface Window {
    __sharethis__?: any;
  }
}
