import React, { useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useGetOmnexioChatModels } from '~/data-provider';
import { AgentTabs } from './AgentTabs';
import { AgentGrid } from './AgentGrid';
import Header from '~/routes/Pages/Header';
import Footer from '~/routes/Pages/Footer';

const TABS = [
  { id: 'chat', label: 'Chat' },
  { id: 'image', label: 'Image' },
  { id: 'video', label: 'Video' },
  { id: 'models', label: 'AI' },
];

export default function AgentsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data: omnexioModels, isLoading } = useGetOmnexioChatModels();

  const activeTab = searchParams.get('tab') || 'chat';

  const handleTabChange = (tabId: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('tab', tabId);

    const newUrl = newSearchParams.toString() ? `/?${newSearchParams.toString()}` : '/';

    navigate(newUrl, { replace: true });
  };

  const filteredModels = useMemo(() => {
    if (!omnexioModels || activeTab === 'All') {
      return omnexioModels || [];
    }

    return omnexioModels.filter((model: any) => {
      const category = model.category || 'Chat';
      return category === activeTab;
    });
  }, [omnexioModels, activeTab]);

  const formatAgentName = (label: string): string => {
    return label.toLowerCase().replace(/\s+/g, '-');
  };

  const handleAgentClick = (model: any) => {
    const agentName = formatAgentName(model.label);
    navigate(`/agents/${agentName}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-lg text-gray-600 dark:text-gray-300">Loading agents...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            Your Complete AI Command Center
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Access dozens of AI agents and models through one unified platform. Our omni-client
            interface and in-houseAI search engine integrates real time data with the perfect AI
            tool, increasing your productivity.
          </p>
        </div>

        <AgentTabs tabs={TABS} activeTab={activeTab} onTabChange={handleTabChange} />

        <AgentGrid models={filteredModels} onAgentClick={handleAgentClick} />
      </div>

      <Footer />
    </div>
  );
}
