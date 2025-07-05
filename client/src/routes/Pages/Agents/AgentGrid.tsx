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
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {models.map((model: any, index: number) => (
        <div
          key={`${model.id}-${index}`}
          onClick={() => onAgentClick(model)}
          className="dark:hover:bg-gray-750 group cursor-pointer rounded-lg bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:bg-gray-800"
        >
          <div className="mb-4 flex items-center justify-center">
            {model.imageUrl ? (
              <img
                src={model.imageUrl}
                alt={model.label}
                className="h-16 w-16 rounded-full object-cover"
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
                model.imageUrl ? 'hidden' : 'flex'
              } h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl dark:bg-blue-900`}
              style={{ display: model.imageUrl ? 'none' : 'flex' }}
            >
              🤖
            </div>
          </div>

          <h3 className="mb-2 text-center text-lg font-semibold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
            {model.label}
          </h3>

          {model.description && (
            <p className="mb-4 line-clamp-3 text-center text-sm text-gray-600 dark:text-gray-300">
              {model.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
