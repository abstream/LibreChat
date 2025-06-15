import React from 'react';
import { useLocalize } from '~/hooks';

/**
 * Component for displaying the Privacy Policy page
 * @returns Privacy Policy React component
 */
export default function Header() {
  const localize = useLocalize();

  const handleNavigateHome = () => {
    window.location.href = '/';
  };

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

          <button
            type="button"
            aria-label={localize('com_ui_new_chat')}
            className="m-1 inline-flex size-10 items-center justify-center rounded-full"
            onClick={handleNavigateHome}
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
        </div>
        {/* Empty div for spacing */}
        <div />
      </div>
    </>
  );
}
