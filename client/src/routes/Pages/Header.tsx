import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLocalize } from '~/hooks';

/**
 * Component for displaying the Header with conditional back button and navigation menu
 * @returns Header React component
 */
export default function Header() {
  const localize = useLocalize();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Debug effect to track state changes
  useEffect(() => {
    console.log('Menu state changed to:', isMenuOpen);
  }, [isMenuOpen]);

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

  const handleNavigateToPage = (path: string) => {
    window.location.href = path;
    handleMenuClose();
  };

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('Toggle clicked, current state:', isMenuOpen);
    setIsMenuOpen((prev) => {
      console.log('State transition:', prev, '->', !prev);
      return !prev;
    });
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const isHomePage = location.pathname === '/';

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Pricing', path: '/pages/pricing' },
    { label: 'Contact', path: '/pages/contact-us' },
    { label: 'Terms of Service', path: '/pages/tos' },
    { label: 'Privacy Policy', path: '/pages/privacy-policy' },
  ];

  return (
    <>
      <div className="sticky top-0 z-10 flex w-full items-center justify-between bg-white p-2 font-semibold text-text-primary dark:bg-gray-800">
        <div className="hide-scrollbar flex w-full items-center justify-between gap-2">
          {/* Menu Section */}
          <div className="relative">
            {/* Desktop Menu */}
            <div className="hidden md:flex">
              <button
                type="button"
                aria-label="Open menu"
                className="m-1 inline-flex size-10 items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                onClick={toggleMenu}
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
                >
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button
                type="button"
                aria-label="Open menu"
                className="m-1 inline-flex size-10 items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                onClick={toggleMenu}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute left-0 top-full z-[9999] mt-1 w-56 rounded-md border border-gray-200 bg-white shadow-xl dark:border-gray-600 dark:bg-gray-800">
                <div className="py-2">
                  {menuItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleNavigateToPage(item.path)}
                      className="block w-full px-4 py-3 text-left text-sm font-medium uppercase text-gray-500 transition-colors hover:bg-blue-50 hover:text-blue-600 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-blue-400"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Logo Section */}
          <img
            src="/assets/omnexio-logo.png"
            alt="Omnexio Logo"
            className="mx-auto w-[120px] cursor-pointer"
            width={120}
            onClick={handleNavigateHome}
          />

          {/* Right Side Buttons */}
          <div className="flex items-center">
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
        </div>
      </div>

      {/* Click outside to close menu */}
      {isMenuOpen && <div className="fixed inset-0" onClick={handleMenuClose} />}
    </>
  );
}
