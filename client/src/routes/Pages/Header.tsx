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
          <div className="w-10"></div>
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
              className="m-1 inline-flex size-10 items-center justify-center rounded-full text-blue-500"
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
                className="lucide lucide-user-pen-icon lucide-user-pen"
              >
                <path d="M11.5 15H7a4 4 0 0 0-4 4v2" />
                <path d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
                <circle cx="10" cy="7" r="4" />
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
