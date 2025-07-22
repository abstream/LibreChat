import React from 'react';
import { useLocation } from 'react-router-dom';
import { useLocalize } from '~/hooks';

/**
 * Component for displaying the Header with conditional back button
 * @returns Header React component
 */
export default function Header() {
  const localize = useLocalize();
  const location = useLocation();

  const handleNavigateHome = () => {
    window.location.href = '/';
  };

  const handleNavigateBack = () => {
    const currentOrigin = window.location.origin;

    // Check if we came from within our site
    if (document.referrer && document.referrer.startsWith(currentOrigin)) {
      history.back();
      return;
    }

    // If no internal referrer or came from external site, go to home
    window.location.href = '/';
  };

  const handleNavigateContactUs = () => {
    window.location.href = '/pages/contact-us';
  };

  const isHomePage = location.pathname === '/';

  return (
    <>
      <div className="sticky top-0 z-10 flex w-full items-center justify-between bg-white p-2 font-semibold text-text-primary dark:bg-gray-800">
        <div className="hide-scrollbar flex w-full items-center justify-between gap-2 overflow-x-auto">
          <img
            src="/assets/omnexio-logo.png"
            alt="Omnexio Logo"
            className="mx-auto w-[120px] cursor-pointer"
            width={120}
            onClick={handleNavigateHome}
          />

          {isHomePage && (
            <button
              type="button"
              aria-label={localize('com_ui_new_chat')}
              className="m-1 inline-flex size-10 items-center justify-center rounded-full text-blue-600"
              onClick={handleNavigateContactUs}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-info-icon lucide-info"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
            </button>
          )}

          {!isHomePage && (
            <button
              type="button"
              aria-label={localize('com_ui_new_chat')}
              className="m-1 inline-flex size-10 items-center justify-center rounded-full"
              onClick={handleNavigateBack}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="icon-md"
              >
                <path
                  d="M19 12H5M12 19L5 12L12 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
        {/* Empty div for spacing */}
        <div />
      </div>
    </>
  );
}
