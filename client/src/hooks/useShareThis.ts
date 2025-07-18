import { useEffect, useRef } from 'react';

interface UseShareThisOptions {
  enabled: boolean;
}

export const useShareThis = ({ enabled }: UseShareThisOptions) => {
  const initRef = useRef(false);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const initializeShareThis = () => {
      // Check if ShareThis is loaded and available
      if (window.__sharethis__ && window.__sharethis__.load) {
        // Initialize ShareThis widgets on the page
        window.__sharethis__.load('sop', {
          property: '687a7803e34fde681160ccd1',
        });
        initRef.current = true;
      }
    };

    const loadScript = () => {
      // Check if ShareThis script is already loaded
      const existingScript = document.querySelector('script[src*="sharethis.com"]');

      if (existingScript) {
        // Script exists, just initialize
        initializeShareThis();
        return;
      }

      // Create and append the ShareThis script
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src =
        'https://platform-api.sharethis.com/js/sharethis.js#property=687a7803e34fde681160ccd1&product=sop';
      script.async = true;

      // Wait for script to load, then initialize
      script.onload = () => {
        // Small delay to ensure ShareThis is fully ready
        setTimeout(initializeShareThis, 100);
      };

      document.head.appendChild(script);
    };

    // Load script or initialize if already loaded
    loadScript();

    // Cleanup function - don't remove script, just mark as uninitialized
    return () => {
      initRef.current = false;
    };
  }, [enabled]);

  // Effect to reinitialize when navigating between ShareThis pages
  useEffect(() => {
    if (!enabled || !initRef.current) {
      return;
    }

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (window.__sharethis__ && window.__sharethis__.load) {
        window.__sharethis__.load('sop', {
          property: '687a7803e34fde681160ccd1',
        });
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [enabled, window.location.pathname]);
};

// Type declaration for ShareThis global
declare global {
  interface Window {
    __sharethis__?: any;
  }
}
