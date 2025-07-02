import React, { useMemo } from 'react';
import { cn } from '~/utils';
import { LocalStorageKeys } from 'librechat-data-provider';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetMessagesByConvoId } from '~/data-provider';

interface ForwardData {
  endpoint: string;
  model: string;
  message: string;
}

interface ForwardProps {
  data: ForwardData;
  className?: string;
}

const encodeBase64 = (plainText: string): string => {
  try {
    const textBytes = new TextEncoder().encode(plainText);
    return btoa(String.fromCharCode(...textBytes));
  } catch (e) {
    return '';
  }
};

const Forward: React.FC<ForwardProps> = ({ data, className }) => {
  const navigate = useNavigate();
  const { endpoint, model, message } = data;
  const params = useParams();
  const currentConvoId = useMemo(() => params.conversationId, [params.conversationId]);
  const { data: _messages } = useGetMessagesByConvoId(currentConvoId ?? '', {
    enabled: true,
  });

  const handleForwardClick = () => {
    const lastUserMessage =
      _messages?.filter((message) => message.sender === 'User').pop()?.text || '';

    localStorage.setItem(`${LocalStorageKeys.TEXT_DRAFT}new`, encodeBase64(lastUserMessage));
    const url =
      '/c/new?endpoint=' + encodeURIComponent(endpoint) + '&model=' + encodeURIComponent(model);
    navigate(url);
  };

  return (
    <div
      className={cn(
        'mb-3 rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-950',
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-xs font-medium text-blue-600 dark:text-blue-400">Forward</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">→ {model}</span>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">{message}</p>
        </div>
        <button
          onClick={handleForwardClick}
          className="ml-3 rounded-md bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Forward
        </button>
      </div>
    </div>
  );
};

export default Forward;
