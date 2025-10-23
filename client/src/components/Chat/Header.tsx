import { useLocation, useNavigate, useOutletContext, useSearchParams } from 'react-router-dom';
import { Constants, QueryKeys, type TMessage } from 'librechat-data-provider';
import type { ContextType } from '~/common';
import { HeaderNewChat, OpenSidebar } from './Menus';
import { useLocalize, useMediaQuery, useNewConvo } from '~/hooks';
import { useGetOmnexioChatModels } from '~/data-provider';
import React, { useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Breadcrumbs } from './Breadcrumbs';
import { ThemeSelector } from '@librechat/client';

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
  const [searchParams] = useSearchParams();
  const location = useLocation();
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

  const handleLogoClick = () => {
    queryClient.setQueryData<TMessage[]>([QueryKeys.messages, Constants.NEW_CONVO], []);
    queryClient.invalidateQueries([QueryKeys.messages]);
    window.location.href = '/c/new?endpoint=OmnexioSearch&model=Omnexio%20Search';
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

          <div className="text-right">
            <ThemeSelector />
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
