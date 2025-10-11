import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetOmnexioChatModels } from '~/data-provider';
import { Constants, QueryKeys, TMessage } from 'librechat-data-provider';
import { useQueryClient } from '@tanstack/react-query';
import { useNewConvo } from '~/hooks';

interface Agent {
  id: string;
  title: string;
  description: string;
  icon: string;
  className: string;
  url: string;
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

const generateModelClassName = (model: ChatModel): string => {
  const platformName = model.platform?.name?.toLowerCase() || '';
  return `model-${platformName}-${model.id}`;
};

const createAgentUrl = (model: ChatModel): string => {
  const encodedModelName = encodeURIComponent(model.label);
  const endpoint = model.endpointName || 'Omnexio';
  return `/c/new?endpoint=${endpoint}&model=${encodedModelName}`;
};

const transformChatModelToAgent = (model: ChatModel): Agent => {
  return {
    id: model.id,
    title: model.label,
    description: model.shortDescription || model.description,
    icon: model.imageUrl,
    className: generateModelClassName(model),
    url: createAgentUrl(model),
  };
};

const clearConversationData = (queryClient: any): void => {
  queryClient.setQueryData<TMessage[]>([QueryKeys.messages, Constants.NEW_CONVO], []);
  queryClient.invalidateQueries([QueryKeys.messages]);
};

const navigateToAgent = (agent: Agent, navigate: (path: string) => void): void => {
  navigate(agent.url);
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

const createEmptyStateView = () => {
  return (
    <div className="empty-state">
      <div className="empty-icon">🔍</div>
      <div className="empty-text">No models found</div>
    </div>
  );
};

const createLoadingStateView = () => {
  return (
    <div className="empty-state">
      <div className="empty-icon">⏳</div>
      <div className="empty-text">Loading models...</div>
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

const createHeaderView = () => {
  return (
    <div className="header-section">
      <h1 className="header-title">AI Studio</h1>
      <p className="header-subtitle">
        Discover and chat with today's most popular AI models — all in one place, with real-time web
        search powered by Omnexio.
      </p>
    </div>
  );
};

const createStyleSheet = () => {
  return (
    <style jsx>
      {`
        .header-section {
          text-align: center;
          margin-bottom: 32px;
        }

        .header-title {
          font-size: 32px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 12px;
        }

        .dark .header-title {
          color: #f3f4f6;
        }

        .header-subtitle {
          font-size: 16px;
          color: #666;
          line-height: 1.6;
          max-width: 700px;
          margin: 0 auto;
        }

        .dark .header-subtitle {
          color: #9ca3af;
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
      `}
    </style>
  );
};

const filterModelsOnly = (models: ChatModel[]): ChatModel[] => {
  if (!models) {
    return [];
  }

  return models.filter((model) => {
    const category = model.category?.toLowerCase() || '';
    return category === 'models';
  });
};

export default function LandingAiStudio({ centerFormOnLanding }: { centerFormOnLanding: boolean }) {
  const navigate = useNavigate();
  const chatModelsQuery = useGetOmnexioChatModels();
  const queryClient = useQueryClient();
  const { newConversation } = useNewConvo();

  const agents = useMemo(() => {
    if (!chatModelsQuery.data?.length) {
      return [];
    }
    const modelsOnly = filterModelsOnly(chatModelsQuery.data);
    return modelsOnly.map(transformChatModelToAgent);
  }, [chatModelsQuery.data]);

  if (chatModelsQuery.isLoading) {
    return (
      <div className="flex h-full w-full flex-col items-center overflow-y-auto px-4 py-3">
        {createStyleSheet()}
        <div className="w-full max-w-6xl">
          {createHeaderView()}
          {createLoadingStateView()}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center overflow-y-auto px-4 py-3">
      {createStyleSheet()}
      <div className="w-full max-w-6xl">
        {createHeaderView()}
        {createAgentGridView(agents, navigate, queryClient, newConversation)}
      </div>
    </div>
  );
}
