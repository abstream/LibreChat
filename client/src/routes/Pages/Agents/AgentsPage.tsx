import React, { useMemo, useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useOmnexioNewsletter, useGetOmnexioChatModels } from '~/data-provider';
import { AgentTabs } from './AgentTabs';
import { AgentGrid } from './AgentGrid';
import Header from '~/routes/Pages/Header';
import Footer from '~/routes/Pages/Footer';
import StickyShareButton from '~/components/ui/StickyShareButton';
import { useSEO } from '~/hooks/useSEO';
import { SEO_DATA } from '~/seo/seoData';
import { ThemeSelector } from '@librechat/client';

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
  const omnexioNewsletter = useOmnexioNewsletter();
  const [newsletterMessage, setNewsletterMessage] = useState('');

  const activeTab = searchParams.get('tab') || 'chat';
  const code = searchParams.get('code');
  const username = searchParams.get('username');

  const processOmnexioNewsletterOnLoad = (): void => {
    if (!code || !username) {
      return;
    }

    omnexioNewsletter.mutate(
      { code: code, username: username },
      {
        onSuccess: handleNewsletterSuccess,
      },
    );
  };

  const handleNewsletterSuccess = (data: any): void => {
    setNewsletterMessage(data.message);
    console.log(data.message);
    console.log(data);
  };

  const dismissMessage = (): void => {
    setNewsletterMessage('');
  };

  useEffect(() => {
    processOmnexioNewsletterOnLoad();
  }, [code, username]);

  useSEO({
    ...SEO_DATA.agents,
  });

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

  const renderNewsletterMessage = () => {
    if (!newsletterMessage) {
      return null;
    }

    return (
      <div className="relative mb-6 rounded-lg border border-green-400 bg-green-100 px-4 py-3 text-green-700">
        <span className="block sm:inline">{newsletterMessage}</span>
        <span
          className="absolute bottom-0 right-0 top-0 cursor-pointer px-4 py-3"
          onClick={dismissMessage}
        >
          <svg
            className="h-6 w-6 fill-current text-green-500"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
          </svg>
        </span>
      </div>
    );
  };

  const shareData = useMemo(
    () => ({
      title: 'Omnexio AI - Deep Search Engine with AI Semantic Search',
      text: `Discover ${activeTab.toLowerCase()} AI models and agents. Access dozens of AI agents and models through one account - our AI search engine integrates real time data with the perfect AI tool.`,
      url: window.location.href,
    }),
    [activeTab],
  );

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
    <div className="min-h-screen" style={{ 'background-color': '#f0f8ff' }}>
      <Header />

      <div className="absolute bottom-0 left-0 md:m-4">
        <ThemeSelector />
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        {renderNewsletterMessage()}

        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            Deep Search Engine with AI Semantic Search
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Discover real answers from multiple sources with deep search. Omnexio helps
            professionals, creators, and SMBs cut through noise and find insights faster.
          </p>
        </div>

        <AgentTabs tabs={TABS} activeTab={activeTab} onTabChange={handleTabChange} />

        <AgentGrid models={filteredModels} onAgentClick={handleAgentClick} />
      </div>

      <Footer />

      <StickyShareButton title={shareData.title} text={shareData.text} url={shareData.url} />
    </div>
  );
}
