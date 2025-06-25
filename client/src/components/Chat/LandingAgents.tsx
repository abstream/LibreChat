import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGetOmnexioChatModels } from '~/data-provider';
import { Constants, QueryKeys, TMessage } from 'librechat-data-provider';
import { useQueryClient } from '@tanstack/react-query';
import { useNewConvo } from '~/hooks';
import { Breadcrumbs } from './Breadcrumbs';

interface Agent {
  id: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
  className: string;
  forYou: boolean;
  url: string;
  category: 'Chat' | 'Image' | 'Video' | 'Models';
}

interface ChatModel {
  id: string;
  name: string;
  label: string;
  cost: number;
  platformId: string;
  imageUrl: string;
  shortDescription: string;
  description: string;
  category: string;
  endpointName: string;
  platform: {
    id: string;
    name: string;
    label: string;
  };
}

type TabKey = 'Chat' | 'Image' | 'Video' | 'Models';

const getPlatformIcon = (platformName: string): string => {
  const platformIconMap: Record<string, string> = {
    anthropic: '🤖',
    openai: '🧠',
    google: '🔍',
    meta: '📱',
    alibaba: '🏢',
    omnexio: '⚡',
  };

  const normalizedName = platformName.toLowerCase();
  return platformIconMap[normalizedName] || '🎯';
};

const generateModelClassName = (model: ChatModel): string => {
  const platformName = model.platform?.name?.toLowerCase() || '';
  return `model-${platformName}-${model.id}`;
};

const normalizeCategory = (category: string): string => {
  return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
};

const createAgentUrl = (model: ChatModel): string => {
  const encodedModelName = encodeURIComponent(model.label);
  const endpoint = model.endpointName || 'Omnexio';
  return `/c/new?endpoint=${endpoint}&model=${encodedModelName}`;
};

const getCategoryTabKey = (category: string): TabKey => {
  const categoryMap: Record<string, TabKey> = {
    chat: 'Chat',
    image: 'Image',
    video: 'Video',
    models: 'Models',
  };

  const normalizedCategory = category.toLowerCase();
  return categoryMap[normalizedCategory] || 'Chat';
};

const getTagStyleClass = (tag: string): string => {
  const tagMap: Record<string, string> = {
    Chat: 'tag-chat',
    Writing: 'tag-writing',
    Document: 'tag-document',
    Image: 'tag-image',
    Video: 'tag-video',
    Audio: 'tag-audio',
    Models: 'tag-models',
  };
  return `tag ${tagMap[tag] || 'tag-default'}`;
};

const transformChatModelToAgent = (model: ChatModel): Agent => {
  return {
    id: model.id,
    title: model.label,
    description: model.shortDescription || model.description,
    icon: model.imageUrl,
    tags: [],
    className: generateModelClassName(model),
    forYou: false,
    url: createAgentUrl(model),
    category: getCategoryTabKey(model.category),
  };
};

const LAST_TAB_STORAGE_KEY = 'landing_agents_last_tab';

const getTabFromUrl = (location: Location): TabKey => {
  const searchParams = new URLSearchParams(location.search);
  const tabParam = searchParams.get('tab') as TabKey;
  const validTabs: TabKey[] = ['Chat', 'Image', 'Video', 'Models'];

  if (validTabs.includes(tabParam)) {
    return tabParam;
  }

  return 'Chat';
};

const getLastTabFromStorage = (): TabKey => {
  try {
    const storedTab = localStorage.getItem(LAST_TAB_STORAGE_KEY) as TabKey;
    const validTabs: TabKey[] = ['Chat', 'Image', 'Video', 'Models'];

    if (validTabs.includes(storedTab)) {
      return storedTab;
    }
  } catch (error) {
    console.warn('Failed to read last tab from localStorage:', error);
  }

  return 'Chat';
};

const saveTabToStorage = (tab: TabKey): void => {
  try {
    localStorage.setItem(LAST_TAB_STORAGE_KEY, tab);
  } catch (error) {
    console.warn('Failed to save tab to localStorage:', error);
  }
};

const updateUrlWithTab = (tab: TabKey, navigate: any, location: Location): void => {
  const searchParams = new URLSearchParams(location.search);
  searchParams.set('tab', tab);
  const newUrl = `${location.pathname}?${searchParams.toString()}`;
  navigate(newUrl, { replace: true });
};

const navigateToAgent = (agent: Agent, navigate: (path: string) => void): void => {
  console.log('Selected agent:', agent.title);
  navigate(agent.url);
};

const createForYouBadge = (forYou: boolean) => {
  if (!forYou) {
    return null;
  }
  return <div className="for-you-badge">For You</div>;
};

const createTagElements = (tags: string[]) => {
  if (tags.length === 0) {
    return null;
  }

  return (
    <div className="tags">
      {tags.map((tag, index) => (
        <span key={index} className={getTagStyleClass(tag)}>
          {tag}
        </span>
      ))}
    </div>
  );
};

const clearConversationData = (queryClient: any): void => {
  queryClient.setQueryData<TMessage[]>([QueryKeys.messages, Constants.NEW_CONVO], []);
  queryClient.invalidateQueries([QueryKeys.messages]);
};

const handleAgentClick = (
  agent: Agent,
  navigate: (path: string) => void,
  queryClient: any,
  newConversation: () => void,
): void => {
  clearConversationData(queryClient);
  newConversation();
  navigateToAgent(agent, navigate);
};

const createAgentCard = (
  agent: Agent,
  navigate: (path: string) => void,
  queryClient: any,
  newConversation: () => void,
) => {
  return (
    <div
      key={agent.id}
      className={`agent-card ${agent.className}`}
      onClick={() => handleAgentClick(agent, navigate, queryClient, newConversation)}
    >
      {createForYouBadge(agent.forYou)}
      <div className="card-header">
        <div className="card-icon">
          <img src={agent.icon} alt={agent.title} width={40} height={40} />
        </div>
        <div>
          <div className="card-title">{agent.title}</div>
          <div className="card-description">{agent.description}</div>
        </div>
      </div>
    </div>
  );
};

const getAgentsByCategory = (agents: Agent[], category: TabKey): Agent[] => {
  return agents.filter((agent) => agent.category === category);
};

const createEmptyStateView = () => {
  return (
    <div className="empty-state">
      <div className="empty-icon">🔍</div>
      <div className="empty-text">No agents found in this category</div>
    </div>
  );
};

const createLoadingStateView = () => {
  return (
    <div className="empty-state">
      <div className="empty-icon">⏳</div>
      <div className="empty-text">Loading agents...</div>
    </div>
  );
};

const createAgentGridView = (
  agents: Agent[],
  navigate: (path: string) => void,
  queryClient: any,
  newConversation: () => void,
) => {
  if (agents.length === 0) {
    return createEmptyStateView();
  }

  return (
    <div className="container">
      {agents.map((agent) => createAgentCard(agent, navigate, queryClient, newConversation))}
    </div>
  );
};

const handleTabClick = (
  tabKey: TabKey,
  navigate: any,
  location: Location,
  setActiveTab: (tab: TabKey) => void,
): void => {
  setActiveTab(tabKey);
  saveTabToStorage(tabKey);
  updateUrlWithTab(tabKey, navigate, location);
};

const createTabButton = (
  tabKey: TabKey,
  label: string,
  activeTab: TabKey,
  navigate: any,
  location: Location,
  setActiveTab: (tab: TabKey) => void,
) => {
  const isActive = activeTab === tabKey;
  const className = `tab-button ${isActive ? 'active' : ''}`;

  return (
    <button
      key={tabKey}
      className={className}
      onClick={() => handleTabClick(tabKey, navigate, location, setActiveTab)}
      type="button"
    >
      <span className="tab-label">{label}</span>
    </button>
  );
};

const createTabNavigationView = (
  activeTab: TabKey,
  navigate: any,
  location: Location,
  setActiveTab: (tab: TabKey) => void,
) => {
  const tabs = [
    { key: 'Chat' as TabKey, label: 'Chat' },
    { key: 'Image' as TabKey, label: 'Image' },
    { key: 'Video' as TabKey, label: 'Video' },
    { key: 'Models' as TabKey, label: 'AI' },
  ];

  return (
    <div className="tab-navigation">
      {tabs.map((tab) =>
        createTabButton(tab.key, tab.label, activeTab, navigate, location, setActiveTab),
      )}
    </div>
  );
};

const createMainContentView = (
  activeTab: TabKey,
  agents: Agent[],
  navigate: (path: string) => void,
  isLoading: boolean,
  queryClient: any,
  newConversation: () => void,
) => {
  if (isLoading) {
    return createLoadingStateView();
  }

  const filteredAgents = getAgentsByCategory(agents, activeTab);
  return createAgentGridView(filteredAgents, navigate, queryClient, newConversation);
};

const createStyleSheet = () => {
  return (
    <style jsx>
      {`
        .tab-navigation {
          display: flex;
          gap: 32px;
          margin-bottom: 24px;
          border-bottom: 1px solid #e1e5e9;
          padding-bottom: 0;
        }

        .dark .tab-navigation {
          border-bottom-color: #374151;
        }

        .tab-button {
          display: flex;
          align-items: center;
          padding: 12px 0;
          border: none;
          background: transparent;
          color: #666;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          position: relative;
        }

        .tab-button:hover {
          color: #1976d2;
        }

        .tab-button.active {
          color: #1976d2;
        }

        .tab-button.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background: #1976d2;
          border-radius: 2px 2px 0 0;
        }

        .dark .tab-button {
          color: #9ca3af;
        }

        .dark .tab-button:hover {
          color: #3b82f6;
        }

        .dark .tab-button.active {
          color: #3b82f6;
        }

        .dark .tab-button.active::after {
          background: #3b82f6;
        }

        .tab-label {
          font-weight: 500;
        }

        .container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
          gap: 10px;
          max-width: 1200px;
          width: 100%;
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 64px 32px;
          text-align: center;
          grid-column: 1 / -1;
        }

        .empty-icon {
          font-size: 48px;
          margin-bottom: 16px;
          opacity: 0.5;
        }

        .empty-text {
          color: #666;
          font-size: 16px;
        }

        .dark .empty-text {
          color: #9ca3af;
        }

        .agent-card {
          background: white;
          border-radius: 12px;
          padding: 5px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          border: 1px solid #e1e5e9;
          position: relative;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .agent-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        }

        .dark .agent-card {
          background: #1f2937;
          border-color: #374151;
        }

        .card-header {
          display: flex;
          margin-bottom: 5px;
        }

        .card-icon {
          width: 48px;
          height: 48px;
          margin-right: 8px;
          margin-left: 5px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }

        .card-title {
          font-size: 20px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 4px;
        }

        .dark .card-title {
          color: #f3f4f6;
        }

        .card-description {
          color: #666;
          font-size: 14px;
          line-height: 1.5;
          max-width: 350px;
        }

        .dark .card-description {
          color: #9ca3af;
        }

        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tag {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          border: 1px solid;
        }

        .tag-chat {
          background: #e3f2fd;
          color: #1976d2;
          border-color: #1976d2;
        }
        .tag-writing {
          background: #fff3e0;
          color: #f57c00;
          border-color: #f57c00;
        }
        .tag-document {
          background: #e8f5e8;
          color: #388e3c;
          border-color: #388e3c;
        }
        .tag-image {
          background: #fce4ec;
          color: #c2185b;
          border-color: #c2185b;
        }
        .tag-video {
          background: #ffebee;
          color: #d32f2f;
          border-color: #d32f2f;
        }
        .tag-audio {
          background: #f3e5f5;
          color: #7b1fa2;
          border-color: #7b1fa2;
        }
        .tag-models {
          background: #e8f5e8;
          color: #388e3c;
          border-color: #388e3c;
        }

        .for-you-badge {
          background: #e91e63;
          color: white;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
          position: absolute;
          top: -8px;
          right: 12px;
        }
      `}
    </style>
  );
};

const initializeActiveTab = (location: Location): TabKey => {
  const tabFromUrl = getTabFromUrl(location);

  if (tabFromUrl !== 'Chat') {
    return tabFromUrl;
  }

  const lastTabFromStorage = getLastTabFromStorage();
  return lastTabFromStorage;
};

const useTabNavigation = (navigate: any, location: Location) => {
  const [activeTab, setActiveTab] = useState<TabKey>(() => initializeActiveTab(location));

  useEffect(() => {
    const tabFromUrl = getTabFromUrl(location);

    if (tabFromUrl !== 'Chat') {
      if (tabFromUrl !== activeTab) {
        setActiveTab(tabFromUrl);
        saveTabToStorage(tabFromUrl);
      }
      return;
    }

    const lastTabFromStorage = getLastTabFromStorage();
    if (lastTabFromStorage !== activeTab) {
      setActiveTab(lastTabFromStorage);
      updateUrlWithTab(lastTabFromStorage, navigate, location);
    }
  }, [location.search, activeTab, navigate, location]);

  return { activeTab, setActiveTab };
};

export default function LandingAgents({ centerFormOnLanding }: { centerFormOnLanding: boolean }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { activeTab, setActiveTab } = useTabNavigation(navigate, location);
  const chatModelsQuery = useGetOmnexioChatModels();
  const queryClient = useQueryClient();
  const { newConversation } = useNewConvo();

  const agents = useMemo(() => {
    if (!chatModelsQuery.data?.length) {
      return [];
    }
    return chatModelsQuery.data.map(transformChatModelToAgent);
  }, [chatModelsQuery.data]);

  return (
    <div className="flex h-full w-full flex-col items-center overflow-y-auto px-4 py-3">
      {createStyleSheet()}
      <div className="w-full max-w-6xl">
        <Breadcrumbs activeTab={activeTab} selectedModel={undefined} />
        {createTabNavigationView(activeTab, navigate, location, setActiveTab)}
        {createMainContentView(
          activeTab,
          agents,
          navigate,
          chatModelsQuery.isLoading,
          queryClient,
          newConversation,
        )}
      </div>
    </div>
  );
}
