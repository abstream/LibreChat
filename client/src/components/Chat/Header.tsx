import { useOutletContext } from 'react-router-dom';
import { getConfigDefaults } from 'librechat-data-provider';
import type { ContextType } from '~/common';
import { HeaderNewChat, OpenSidebar } from './Menus';
import { useMediaQuery } from '~/hooks';

const defaultInterface = getConfigDefaults().interface;

export default function Header() {
  const { navVisible, setNavVisible } = useOutletContext<ContextType>();
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  if (isSmallScreen) {
    return '';
  }

  return (
    <div className="sticky top-0 z-10 flex w-full items-center justify-between bg-white p-2 font-semibold text-text-primary dark:bg-gray-800">
      <div className="hide-scrollbar flex w-full items-center justify-between gap-2 overflow-x-auto">
        <div className="mx-1 flex items-center gap-2">
          <div
            className={`flex items-center gap-2 ${
              !isSmallScreen ? 'transition-all duration-200 ease-in-out' : ''
            } ${
              !navVisible
                ? 'translate-x-0 opacity-100'
                : 'pointer-events-none translate-x-[-100px] opacity-0'
            }`}
          >
            <OpenSidebar setNavVisible={setNavVisible} />
            <HeaderNewChat />
          </div>
        </div>
      </div>
      {/* Empty div for spacing */}
      <div />
    </div>
  );
}
