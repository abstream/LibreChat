import { useLocation, useNavigate, useOutletContext, useSearchParams } from 'react-router-dom';
import { Constants, QueryKeys, type TMessage } from 'librechat-data-provider';
import type { ContextType } from '~/common';
import { HeaderNewChat, OpenSidebar } from './Menus';
import { useLocalize, useMediaQuery, useNewConvo } from '~/hooks';
import { useGetOmnexioChatModels } from '~/data-provider';
import React, { useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Breadcrumbs } from './Breadcrumbs';

const findModelByName = (models: any[], modelName: string) => {
  if (!models || !modelName) {
    return null;
  }

  return models.find(
    (model) => model.label === modelName || model.name === modelName || model.id === modelName,
  );
};

const getActiveTabFromUrl = (): string | undefined => {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get('tab') || undefined;
};

export default function Header() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { newConversation } = useNewConvo();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const localize = useLocalize();
  const { navVisible, setNavVisible } = useOutletContext<ContextType>();
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  const { data: omnexioModels } = useGetOmnexioChatModels();

  const model = searchParams.get('model');
  const activeTab = getActiveTabFromUrl();

  const selectedModel = useMemo(() => {
    return findModelByName(omnexioModels, model || '');
  }, [omnexioModels, model]);

  if (isSmallScreen) {
    return '';
  }

  const shouldShowBackButton = (): boolean => {
    return !!model || location.pathname !== '/c/new';
  };

  const handleLogoClick = () => {
    queryClient.setQueryData<TMessage[]>([QueryKeys.messages, Constants.NEW_CONVO], []);
    queryClient.invalidateQueries([QueryKeys.messages]);
    navigate('/c/new');
  };

  const handleNavigateBack = () => {
    queryClient.setQueryData<TMessage[]>([QueryKeys.messages, Constants.NEW_CONVO], []);
    queryClient.invalidateQueries([QueryKeys.messages]);
    history.back();
  };

  const handleNavigateContactUs = () => {
    navigate('/pages/contact-us');
  };

  return (
    <div className="sticky top-0 z-10 flex w-full flex-col bg-white font-semibold text-text-primary dark:bg-gray-800">
      <div className="flex w-full items-center justify-between p-2">
        <div className="hide-scrollbar flex w-full items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-2">
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
          <img
            src="/assets/omnexio-logo.png"
            alt="Omnexio Logo"
            className="mx-auto w-[120px] cursor-pointer"
            width={120}
            onClick={handleLogoClick}
          />

          <div className="text-right" style={{ width: '88px' }}>
            {shouldShowBackButton() && (
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
            {!shouldShowBackButton() && (
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
          </div>
        </div>
      </div>

      {/* Breadcrumbs section */}
      <div className="flex">
        <div className="w-full pl-9 md:max-w-3xl xl:max-w-4xl">
          <Breadcrumbs activeTab={activeTab} selectedModel={selectedModel} />
        </div>
      </div>
    </div>
  );
}
