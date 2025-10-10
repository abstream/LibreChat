import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetOmnexioChatModels } from '~/data-provider';
import { AgentGrid } from '../Agents/AgentGrid';
import Header from '~/routes/Pages/Header';
import Footer from '~/routes/Pages/Footer';
import StickyShareButton from '~/components/ui/StickyShareButton';
import { useSEO } from '~/hooks/useSEO';
import { ThemeSelector } from '@librechat/client';

const formatAgentName = (label: string): string => {
  return label.toLowerCase().replace(/\s+/g, '-');
};

const filterModelsOnly = (models: any[]): any[] => {
  if (!models) {
    return [];
  }

  return models.filter((model: any) => {
    const category = model.category?.toLowerCase() || '';
    return category === 'models';
  });
};

const createShareData = () => {
  return {
    title: 'AI Studio - Omnexio AI Models',
    text: 'Explore and interact with cutting-edge AI models. Access various AI models through one unified platform.',
    url: window.location.href,
  };
};

const navigateToAgentProfile = (model: any, navigate: any): void => {
  const agentName = formatAgentName(model.label);
  navigate(`/ai-studio/${agentName}`);
};

const renderLoadingState = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="flex items-center justify-center py-20">
        <div className="text-lg text-gray-600 dark:text-gray-300">Loading models...</div>
      </div>
      <Footer />
    </div>
  );
};

export default function AiStudioPage() {
  const navigate = useNavigate();
  const { data: omnexioModels, isLoading } = useGetOmnexioChatModels();

  useSEO({
    title: 'AI Studio - Omnexio AI Models',
    description: 'Explore and interact with cutting-edge AI models on Omnexio AI Studio.',
    keywords: 'AI models, machine learning, artificial intelligence, AI studio',
  });

  const filteredModels = useMemo(() => {
    return filterModelsOnly(omnexioModels || []);
  }, [omnexioModels]);

  const handleAgentClick = (model: any) => {
    navigateToAgentProfile(model, navigate);
  };

  const shareData = useMemo(() => {
    return createShareData();
  }, []);

  if (isLoading) {
    return renderLoadingState();
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f0f8ff' }}>
      <Header />

      <div className="absolute bottom-0 left-0 md:m-4">
        <ThemeSelector />
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">AI Studio</h1>
          <p className="text-lg text-gray-600">
            Explore and interact with cutting-edge AI models. Access various AI models through one
            unified platform.
          </p>
        </div>

        <AgentGrid models={filteredModels} onAgentClick={handleAgentClick} />
      </div>

      <Footer />

      <StickyShareButton title={shareData.title} text={shareData.text} url={shareData.url} />
    </div>
  );
}
