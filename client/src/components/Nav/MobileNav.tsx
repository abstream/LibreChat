import React from 'react';
import { useRecoilValue } from 'recoil';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys, Constants } from 'librechat-data-provider';
import type { TMessage } from 'librechat-data-provider';
import type { Dispatch, SetStateAction } from 'react';
import { useLocalize, useNewConvo } from '~/hooks';
import store from '~/store';

export default function MobileNav({
  setNavVisible,
}: {
  setNavVisible: Dispatch<SetStateAction<boolean>>;
}) {
  const localize = useLocalize();
  const queryClient = useQueryClient();
  const { newConversation } = useNewConvo();
  const conversation = useRecoilValue(store.conversationByIndex(0));
  const { title = 'New Chat' } = conversation || {};

  return (
    <div className="bg-token-main-surface-primary sticky top-0 z-10 flex min-h-[40px] items-center justify-center bg-white pl-1 dark:bg-gray-800 dark:text-white md:hidden">
      <button
        type="button"
        data-testid="mobile-header-new-chat-button"
        aria-label={localize('com_nav_open_sidebar')}
        className="m-1 inline-flex size-10 items-center justify-center rounded-full hover:bg-surface-hover"
        onClick={() =>
          setNavVisible((prev) => {
            localStorage.setItem('navVisible', JSON.stringify(!prev));
            return !prev;
          })
        }
      >
        <span className="sr-only">{localize('com_nav_open_sidebar')}</span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="icon-md"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 8C3 7.44772 3.44772 7 4 7H20C20.5523 7 21 7.44772 21 8C21 8.55228 20.5523 9 20 9H4C3.44772 9 3 8.55228 3 8ZM3 16C3 15.4477 3.44772 15 4 15H14C14.5523 15 15 15.4477 15 16C15 16.5523 14.5523 17 14 17H4C3.44772 17 3 16.5523 3 16Z"
            fill="currentColor"
          />
        </svg>
      </button>

      <h1 className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-center text-sm font-normal">
        {title !== 'New Chat' ? (
          (title ?? localize('com_ui_new_chat'))
        ) : (
          <img
            src="/assets/omnexio-logo.png"
            alt="Omnexio Logo"
            className="mx-auto w-[120px]"
            width={120}
          />
        )}
      </h1>
      <button
        type="button"
        aria-label={localize('com_ui_new_chat')}
        className="m-1 inline-flex size-10 items-center justify-center rounded-full hover:bg-surface-hover"
        onClick={() => {
          queryClient.setQueryData<TMessage[]>(
            [QueryKeys.messages, conversation?.conversationId ?? Constants.NEW_CONVO],
            [],
          );
          queryClient.invalidateQueries([QueryKeys.messages]);
          newConversation();
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
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
  );
}
