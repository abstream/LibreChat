import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetOmnexioChatModels } from '~/data-provider';
import Header from '~/routes/Pages/Header';
import Footer from '~/routes/Pages/Footer';
import StickyShareButton from '~/components/ui/StickyShareButton';
import { Button } from '~/components/ui';
import { useSEO } from '~/hooks/useSEO';
import { generateAgentSEO } from '~/utils/seoUtils';
import { ThemeSelector } from '@librechat/client';

export default function AgentProfilePage() {
  const { agent_name } = useParams<{ agent_name: string }>();
  const navigate = useNavigate();
  const { data: omnexioModels, isLoading } = useGetOmnexioChatModels();

  const agent = useMemo(() => {
    if (!omnexioModels || !agent_name) return null;

    return omnexioModels.find((model: any) => {
      const formattedName = model.label.toLowerCase().replace(/\s+/g, '-');
      return formattedName === agent_name;
    });
  }, [omnexioModels, agent_name]);

  useSEO(agent ? generateAgentSEO(agent_name || '', agent) : {});

  const handleTryAgent = () => {
    // Navigate to chat with this specific agent
    const encodedModelName = encodeURIComponent(agent.label);
    const endpoint = agent.endpointName || 'Omnexio';
    navigate(`/c/new?endpoint=${endpoint}&model=${encodedModelName}`);
  };

  const handleBackToAgents = () => {
    navigate('/agents?tab=' + agent.category);
  };

  const handleBackToAgentsHard = () => {
    window.location.href = '/agents';
  };

  const shareData = useMemo(() => {
    if (!agent) return null;

    return {
      title: `${agent.label} - AI Agent on Omnexio`,
      text: `Check out ${agent.label} on Omnexio - ${agent.shortDescription || agent.description?.replace(/<[^>]*>/g, '').slice(0, 100) + '...' || 'An AI agent that can help you with various tasks.'}`,
      url: window.location.href,
    };
  }, [agent]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />

        <div className="absolute bottom-0 left-0 md:m-4">
          <ThemeSelector />
        </div>

        <div className="flex items-center justify-center py-20">
          <div className="text-lg text-gray-600 dark:text-gray-300">Loading agent...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />

        <div className="absolute bottom-0 left-0 md:m-4">
          <ThemeSelector />
        </div>

        <div className="container mx-auto max-w-4xl px-4 py-8">
          <div className="text-center">
            <div className="mb-8">
              <h1 className="mb-4 text-4xl font-bold text-gray-900">
                Agent Not Found
              </h1>
              <p className="text-lg text-gray-600">
                The agent you&#39;re looking for doesn&#39;t exist or has been removed.
              </p>
            </div>
            <Button onClick={handleBackToAgentsHard} className="bg-blue-600 hover:bg-blue-700">
              Back to Agents
            </Button>
          </div>
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

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-lg bg-white p-8 shadow-sm">
          {/* Agent Header */}
          <div className="mb-8 flex flex-col items-center text-center sm:flex-row sm:text-left">
            <div className="mb-4 sm:mb-0 sm:mr-6">
              {agent.imageUrl ? (
                <img
                  src={agent.imageUrl}
                  alt={agent.label}
                  className="h-24 w-24 rounded-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) {
                      fallback.style.display = 'flex';
                    }
                  }}
                />
              ) : null}
              <div
                className={`${
                  agent.imageUrl ? 'hidden' : 'flex'
                } h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-4xl dark:bg-blue-900`}
                style={{ display: agent.imageUrl ? 'none' : 'flex' }}
              >
                🤖
              </div>
            </div>

            <div className="flex-1">
              <h1 className="mb-2 text-3xl font-bold text-gray-900">
                {agent.label}
              </h1>

              {agent.category && (
                <span
                  onClick={handleBackToAgents}
                  className="inline-flex cursor-pointer items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                >
                  {agent.category === 'models' ? 'AI' : agent.category}
                </span>
              )}
            </div>
          </div>

          {/* Agent Description */}
          {agent.description && (
            <div className="mb-8">
              <div dangerouslySetInnerHTML={{ __html: agent.description }} />
              {agent.options?._related && (
                <div className="mt-2">
                  <b>Related:</b>
                  {agent.options._related.map((item: any, index: number) => (
                    <a
                      key={`${item.id}-${index}`}
                      className="ml-1 text-blue-500 underline"
                      href={item.public_url}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
              <div>
                <b>Web search by</b>{' '}
                <a className="ml-1 text-blue-500 underline" href="https://aisearchapi.io">
                  AI Search API
                </a>
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="text-center">
            <Button
              onClick={handleTryAgent}
              className="bg-blue-400 px-8 py-3 text-lg hover:bg-blue-400"
            >
              Chat Now
            </Button>
          </div>
        </div>
      </div>

      <Footer />

      {shareData && (
        <StickyShareButton title={shareData.title} text={shareData.text} url={shareData.url} />
      )}
    </div>
  );
}
