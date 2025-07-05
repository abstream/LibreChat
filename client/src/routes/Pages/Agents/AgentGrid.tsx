import React from 'react';

interface AgentGridProps {
  models: any[];
  onAgentClick: (model: any) => void;
}

export function AgentGrid({ models, onAgentClick }: AgentGridProps) {
  if (!models || models.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="mb-4 text-6xl">🤖</div>
          <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
            No agents found
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Try selecting a different category or check back later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style jsx>
        {`
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

          .card-description {
            color: #666;
            font-size: 14px;
            line-height: 1.5;
            max-width: 350px;
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
        `}
      </style>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {models.map((model: any, index: number) => (
          <div
            key={`${model.id}-${index}`}
            onClick={() => onAgentClick(model)}
            className="agent-card dark:hover:bg-gray-750 group flex cursor-pointer rounded-lg bg-white p-1 shadow-sm transition-all duration-200 hover:shadow-md dark:bg-gray-800"
          >
            <div className="card-icon">
              <img width={40} height={40} src={model.imageUrl} alt={model.label} />
            </div>

            <div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                {model.label}
              </h3>

              {model.shortDescription && (
                <p className="card-description">{model.shortDescription}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
