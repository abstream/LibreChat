import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetOmnexioChatModels } from '~/data-provider';

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
  platform: {
    id: string;
    name: string;
    label: string;
  };
}

type TabKey = 'Chat' | 'Image' | 'Video' | 'Models';

const mapChatModelToAgent = (model: ChatModel): Agent => {
  return {
    id: model.id,
    title: model.label,
    description: model.shortDescription || model.description,
    icon: getIconForModel(model),
    tags: [],
    className: getClassNameForModel(model),
    forYou: false,
    url: buildAgentUrl(model),
    category: mapCategoryToTabKey(model.category),
  };
};

const getIconForModel = (model: ChatModel): string => {
  const platformIconMap: Record<string, string> = {
    anthropic: '🤖',
    openai: '🧠',
    google: '🔍',
    meta: '📱',
    alibaba: '🏢',
    omnexio: '⚡',
  };

  const platformName = model.platform?.name?.toLowerCase() || '';
  return platformIconMap[platformName] || '🎯';
};

const getClassNameForModel = (model: ChatModel): string => {
  const platformName = model.platform?.name?.toLowerCase() || '';
  return `model-${platformName}-${model.id}`;
};

const capitalizeCategory = (category: string): string => {
  return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
};

const buildAgentUrl = (model: ChatModel): string => {
  const encodedModelName = encodeURIComponent(model.label);
  const platformLabel = model.platform?.label || 'Default';
  const encodedPlatform = encodeURIComponent(platformLabel);

  return `/c/new?endpoint=${encodedPlatform}&model=${encodedModelName}&agent=${model.name}`;
};

const mapCategoryToTabKey = (category: string): TabKey => {
  const categoryMap: Record<string, TabKey> = {
    chat: 'Chat',
    image: 'Image',
    video: 'Video',
    models: 'Models',
  };

  const normalizedCategory = category.toLowerCase();
  return categoryMap[normalizedCategory] || 'Chat';
};

const getTagClassName = (tag: string): string => {
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

const handleAgentClick = (agent: Agent, navigate: (path: string) => void): void => {
  console.log('Selected agent:', agent.title);
  navigate(agent.url);
};

const renderForYouBadge = (forYou: boolean) => {
  if (!forYou) return null;
  return <div className="for-you-badge">For You</div>;
};

const renderTags = (tags: string[]) => {
  if (tags.length === 0) return null;

  return (
    <div className="tags">
      {tags.map((tag, index) => (
        <span key={index} className={getTagClassName(tag)}>
          {tag}
        </span>
      ))}
    </div>
  );
};

const renderAgentCard = (agent: Agent, navigate: (path: string) => void) => {
  return (
    <div
      key={agent.id}
      className={`agent-card ${agent.className}`}
      onClick={() => handleAgentClick(agent, navigate)}
    >
      {renderForYouBadge(agent.forYou)}
      <div className="card-header">
        <div className="card-icon">{agent.icon}</div>
        <div>
          <div className="card-title">{agent.title}</div>
          <div className="card-description">{agent.description}</div>
        </div>
      </div>
    </div>
  );
};

const filterAgentsByCategory = (agents: Agent[], category: TabKey): Agent[] => {
  return agents.filter((agent) => agent.category === category);
};

const renderEmptyState = () => {
  return (
    <div className="empty-state">
      <div className="empty-icon">🔍</div>
      <div className="empty-text">No agents found in this category</div>
    </div>
  );
};

const renderLoadingState = () => {
  return (
    <div className="empty-state">
      <div className="empty-icon">⏳</div>
      <div className="empty-text">Loading agents...</div>
    </div>
  );
};

const renderAgentGrid = (agents: Agent[], navigate: (path: string) => void) => {
  if (agents.length === 0) {
    return renderEmptyState();
  }

  return <div className="container">{agents.map((agent) => renderAgentCard(agent, navigate))}</div>;
};

const renderTabButton = (
  tabKey: TabKey,
  label: string,
  activeTab: TabKey,
  onTabChange: (tab: TabKey) => void,
) => {
  const isActive = activeTab === tabKey;
  const className = `tab-button ${isActive ? 'active' : ''}`;

  return (
    <button key={tabKey} className={className} onClick={() => onTabChange(tabKey)} type="button">
      <span className="tab-label">{label}</span>
    </button>
  );
};

const renderTabNavigation = (activeTab: TabKey, onTabChange: (tab: TabKey) => void) => {
  const tabs = [
    { key: 'Chat' as TabKey, label: 'Chat' },
    { key: 'Image' as TabKey, label: 'Image' },
    { key: 'Video' as TabKey, label: 'Video' },
    { key: 'Models' as TabKey, label: 'Models' },
  ];

  return (
    <div className="tab-navigation">
      {tabs.map((tab) => renderTabButton(tab.key, tab.label, activeTab, onTabChange))}
    </div>
  );
};

const renderContent = (
  activeTab: TabKey,
  agents: Agent[],
  navigate: (path: string) => void,
  isLoading: boolean,
) => {
  if (isLoading) {
    return renderLoadingState();
  }

  const filteredAgents = filterAgentsByCategory(agents, activeTab);
  return renderAgentGrid(filteredAgents, navigate);
};

export default function LandingAgents({ centerFormOnLanding }: { centerFormOnLanding: boolean }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabKey>('Chat');
  const chatModelsQuery = useGetOmnexioChatModels();

  const agents = useMemo(() => {
    if (!chatModelsQuery.data?.length) return [];
    return chatModelsQuery.data.map(mapChatModelToAgent);
  }, [chatModelsQuery.data]);

  return (
    <div className="flex h-full w-full flex-col items-center overflow-y-auto bg-gray-50 px-4 py-3 dark:bg-gray-900">
      <style jsx>{`
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
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
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
          align-items: center;
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
      `}</style>

      <div className="w-full max-w-6xl">
        {renderTabNavigation(activeTab, setActiveTab)}
        {renderContent(activeTab, agents, navigate, chatModelsQuery.isLoading)}
      </div>
    </div>
  );
}
