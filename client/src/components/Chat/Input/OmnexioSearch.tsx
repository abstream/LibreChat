import React, { memo, useState, useCallback, useRef, useEffect } from 'react';
import { Zap, X } from 'lucide-react';
import { Constants, LocalStorageKeys } from 'librechat-data-provider';
import { useLocalize } from '~/hooks';
import useLocalStorage from '~/hooks/useLocalStorageAlt';
import { useRecoilValue } from 'recoil';
import store from '~/store';

type SearchType = 'fast' | 'deep' | 'no';

interface SearchOption {
  value: SearchType;
  label: string;
  icon: React.ReactNode;
}

const storageCondition = (value: unknown) => {
  return value !== undefined && value !== null && value !== '';
};

function OmnexioSearch({ conversationId }: { conversationId?: string | null }): JSX.Element {
  const localize = useLocalize();
  const key = conversationId ?? Constants.NEW_CONVO;
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get selected model from Recoil state
  const selectedModel = useRecoilValue(store.selectedModelState);

  const [searchType, setSearchType] = useLocalStorage<SearchType>(
    `${LocalStorageKeys.LAST_OMNEXIO_SEARCH_TOGGLE_}${key}`,
    'fast',
    storageCondition,
  );

  const [isOpen, setIsOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);

  const searchOptions: SearchOption[] = [
    {
      value: 'fast',
      label: localize('com_omnexio_fast_search') || 'Fast Search',
      icon: <Zap className="h-4 w-4" />,
    },
    {
      value: 'deep',
      label: localize('com_omnexio_deep_search') || 'Deep Search',
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
          <path d="M11 7v8" />
          <path d="M7 11h8" />
        </svg>
      ),
    },
  ];

  // Check if current model is Omnexio Search
  const isOmnexioSearchModel = selectedModel?.label === 'Omnexio Search';

  // Add "No Search" option if model is not "Omnexio Search"
  if (!isOmnexioSearchModel) {
    searchOptions.unshift({
      value: 'no',
      label: localize('com_omnexio_no_search') || 'No Search',
      icon: <X className="h-4 w-4" />,
    });
  }

  const selectedOption = searchOptions.find((opt) => opt.value === searchType) || searchOptions[0];

  const toggleDropdown = useCallback(() => {
    if (!isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const dropdownHeight = 130;

      if (spaceBelow < dropdownHeight) {
        setOpenUpward(true);
      } else {
        setOpenUpward(false);
      }
    }
    setIsOpen((prev) => !prev);
  }, [isOpen]);

  const handleSelect = useCallback(
    (value: SearchType) => {
      setSearchType(value);
      setIsOpen(false);

      // Trigger a custom event to notify other components about the search type change
      setTimeout(() => {
        // Trigger a custom event to notify other components about the search type change
        window.dispatchEvent(
          new CustomEvent('omnexioSearchTypeChange', {
            detail: { searchType: value },
          }),
        );
      }, 500);
    },
    [setSearchType],
  );

  useEffect(() => {
    handleSelect('fast');

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <button
        type="button"
        onClick={toggleDropdown}
        className={`flex min-w-[130px] items-center justify-between gap-2 rounded-full border px-3 py-2 text-sm transition-all duration-200 ${
          isOpen
            ? 'border-blue-300 bg-blue-100 text-blue-600'
            : 'border-gray-300 bg-white text-gray-800 hover:border-gray-400 hover:bg-gray-50'
        }`}
      >
        {selectedOption.icon}
        <span>{selectedOption.label}</span>
        <div
          className={`ml-1 h-0 w-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-current transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div
          style={openUpward ? { marginTop: '-130px' } : undefined}
          className="absolute left-0 right-0 top-full z-[1000] mt-1 overflow-hidden rounded-xl border border-gray-300 bg-white shadow-lg"
        >
          {searchOptions.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`flex cursor-pointer items-center gap-2 border-b border-gray-100 px-4 py-3 text-sm transition-colors last:border-b-0 ${
                option.value === searchType
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {option.icon}
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default memo(OmnexioSearch);
