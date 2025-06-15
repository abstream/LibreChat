import { useOutletContext, useSearchParams } from 'react-router-dom';
import { Constants, getConfigDefaults, QueryKeys, type TMessage } from 'librechat-data-provider';
import type { ContextType } from '~/common';
import { HeaderNewChat, OpenSidebar } from './Menus';
import { useLocalize, useMediaQuery, useNewConvo } from '~/hooks';
import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import store from '~/store';

const defaultInterface = getConfigDefaults().interface;

export default function Header() {
  const queryClient = useQueryClient();
  const { newConversation } = useNewConvo();
  const [searchParams] = useSearchParams();
  const localize = useLocalize();
  const conversation = useRecoilValue(store.conversationByIndex(0));
  const { navVisible, setNavVisible } = useOutletContext<ContextType>();
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  if (isSmallScreen) {
    return '';
  }

  const model = searchParams.get('model');
  const { title = 'New Chat' } = conversation || {};

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
        <img
          src="/assets/omnexio-logo.png"
          alt="Omnexio Logo"
          className="mx-auto w-[120px] cursor-pointer"
          width={120}
          onClick={() => {
            queryClient.setQueryData<TMessage[]>([QueryKeys.messages, Constants.NEW_CONVO], []);
            queryClient.invalidateQueries([QueryKeys.messages]);
            newConversation();
          }}
        />

        <button
          type="button"
          aria-label={localize('com_ui_new_chat')}
          className="m-1 inline-flex size-10 items-center justify-center rounded-full"
          onClick={() => {
            queryClient.setQueryData<TMessage[]>([QueryKeys.messages, Constants.NEW_CONVO], []);
            queryClient.invalidateQueries([QueryKeys.messages]);
            newConversation();
          }}
        >
          {(model || title !== 'New Chat') && (
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
          )}
        </button>
      </div>
      {/* Empty div for spacing */}
      <div />
    </div>
  );
}
