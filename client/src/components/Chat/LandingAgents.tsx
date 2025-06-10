import React from 'react';

const studios = [
  {
    id: 'trailblazer',
    title: 'TaskMaster AI',
    description:
      'Automates your to-do list, prioritizes tasks based on deadlines, and helps you stay organized throughout the day.',
    icon: '🚀',
    tags: [],
    className: 'ai-trailblazer',
    forYou: true,
  },
  {
    id: 'small-business',
    title: 'SalesPitch Bot',
    description:
      'Crafts persuasive sales emails and pitches tailored to your audience and product type.',
    icon: '🏪',
    tags: [],
    className: 'small-business',
    forYou: false,
  },
  {
    id: 'marketer',
    title: 'LifeCoach AI',
    description: 'Provides motivational coaching, habit tracking, and personalized growth plans.',
    icon: '📊',
    tags: [],
    className: 'marketer',
    forYou: false,
  },
  {
    id: 'content-creator',
    title: 'Content Creator',
    description: 'Multimedia tools for your content',
    icon: '🎬',
    tags: [],
    className: 'content-creator',
    forYou: false,
  },
  {
    id: 'copywriter',
    title: 'Copywriter',
    description: 'Multimedia content creation with better SEO',
    icon: '✍️',
    tags: [],
    className: 'copywriter',
    forYou: false,
  },
  {
    id: 'artist',
    title: 'Artist',
    description: 'Innovation unbounded for artistic creations',
    icon: '🎨',
    tags: [],
    className: 'artist',
    forYou: false,
  },
  {
    id: 'designer',
    title: 'Designer Studio',
    description: 'Be more creative in visual',
    icon: '🎯',
    tags: [],
    className: 'designer',
    forYou: false,
  },
  {
    id: 'photographer',
    title: 'Photographer',
    description: 'Edit your photo faster',
    icon: '📷',
    tags: [],
    className: 'photographer',
    forYou: false,
  },
];

const getTagClassName = (tag: string) => {
  const tagMap: Record<string, string> = {
    Chat: 'tag-chat',
    Writing: 'tag-writing',
    Document: 'tag-document',
    Image: 'tag-image',
    Video: 'tag-video',
    Audio: 'tag-audio',
  };
  return `tag ${tagMap[tag] || 'tag-default'}`;
};

export default function LandingAgents({ centerFormOnLanding }: { centerFormOnLanding: boolean }) {
  return (
    <div className="flex h-full w-full flex-col items-center overflow-y-auto bg-gray-50 px-4 py-8 dark:bg-gray-900">
      <style jsx>{`
        .header {
          display: flex;
          align-items: center;
          margin-bottom: 30px;
          font-size: 18px;
          font-weight: 500;
          color: #333;
        }

        .header::before {
          content: '✎';
          margin-right: 10px;
          color: #666;
        }

        .container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 20px;
          max-width: 1200px;
          width: 100%;
        }

        .studio-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          border: 1px solid #e1e5e9;
          position: relative;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .studio-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        }

        .dark .studio-card {
          background: #1f2937;
          border-color: #374151;
        }

        .card-header {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
        }

        .card-icon {
          width: 48px;
          height: 48px;
          margin-right: 16px;
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
          margin-bottom: 16px;
          line-height: 1.5;
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

        .ai-trailblazer .card-icon {
          background: #e3f2fd;
          color: #1976d2;
        }

        .small-business .card-icon {
          background: #fff3e0;
          color: #f57c00;
        }

        .marketer .card-icon {
          background: #e8f5e8;
          color: #388e3c;
        }

        .content-creator .card-icon {
          background: #fce4ec;
          color: #c2185b;
        }

        .copywriter .card-icon {
          background: #f3e5f5;
          color: #7b1fa2;
        }

        .artist .card-icon {
          background: #ffebee;
          color: #d32f2f;
        }

        .designer .card-icon {
          background: #e0f2f1;
          color: #00796b;
        }

        .photographer .card-icon {
          background: #e8eaf6;
          color: #3f51b5;
        }

        .dark .header {
          color: #f3f4f6;
        }

        .dark .header::before {
          color: #9ca3af;
        }
      `}</style>

      <div className="w-full max-w-6xl">
        <div className="container">
          {studios.map((studio) => (
            <div
              key={studio.id}
              className={`studio-card ${studio.className}`}
              onClick={() => {
                // Handle agent selection - you can dispatch an action or navigate
                console.log('Selected agent:', studio.title);
              }}
            >
              {studio.forYou && <div className="for-you-badge">For You</div>}
              <div className="card-header">
                <div className="card-icon">{studio.icon}</div>
                <div>
                  <div className="card-title">{studio.title}</div>
                  <div className="card-description">{studio.description}</div>
                </div>
              </div>
              {studio.tags.length > 0 && (
                <div className="tags">
                  {studio.tags.map((tag, index) => (
                    <span key={index} className={getTagClassName(tag)}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
