import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetOmnexioChatModels } from '~/data-provider';
import Header from '~/routes/Pages/Header';
import Footer from '~/routes/Pages/Footer';
import { Button } from '~/components/ui';

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

  const handleTryAgent = () => {
    // Navigate to chat with this specific agent
    const encodedModelName = encodeURIComponent(agent.label);
    const endpoint = agent.endpointName || 'Omnexio';
    navigate(`/c/new?endpoint=${endpoint}&model=${encodedModelName}`);
  };

  const handleBackToAgents = () => {
    navigate('/?tab=' + agent.category);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-lg text-gray-600 dark:text-gray-300">Loading agent...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <div className="text-center">
            <div className="mb-8">
              <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
                Agent Not Found
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                The agent you&#39;re looking for doesn&#39;t exist or has been removed.
              </p>
            </div>
            <Button onClick={handleBackToAgents} className="bg-blue-600 hover:bg-blue-700">
              Back to Agents
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-lg bg-white p-8 shadow-sm dark:bg-gray-800">
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
              <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
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
            </div>
          )}

          {/* Action Button */}
          <div className="text-center">
            <Button
              onClick={handleTryAgent}
              className="bg-blue-600 px-8 py-3 text-lg hover:bg-blue-700"
            >
              Chat Now
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
