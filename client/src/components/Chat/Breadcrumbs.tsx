import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  href: string;
  isActive?: boolean;
}

interface BreadcrumbsProps {
  activeTab: string | undefined;
  selectedModel?: {
    label: string;
    category: string;
  };
}

const createBreadcrumbItems = (
  activeTab: string | undefined,
  selectedModel?: { label: string; category: string },
): BreadcrumbItem[] => {
  const items: BreadcrumbItem[] = [
    {
      label: 'All',
      href: '/c/new',
      isActive: activeTab === 'Chat' && !selectedModel,
    },
  ];

  if (!activeTab && selectedModel) {
    activeTab = selectedModel.category.charAt(0).toUpperCase() + selectedModel.category.slice(1);
  }

  const categoryMap: Record<string, string> = {
    Chat: 'Chat',
    Image: 'Image',
    Video: 'Video',
    Models: 'AI',
  };

  if (activeTab) {
    items.push({
      label: categoryMap[activeTab],
      href: `/c/new?tab=${activeTab}`,
      isActive: !selectedModel,
    });
  }

  if (selectedModel) {
    items.push({
      label: selectedModel.label,
      href: '', // No link for model
      isActive: true,
    });
  }

  return items;
};

const handleBreadcrumbClick = (href: string, navigate: (path: string) => void): void => {
  navigate(href);
};

const createBreadcrumbLink = (item: BreadcrumbItem, navigate: (path: string) => void) => {
  if (item.isActive || !item.href) {
    return <span className="breadcrumb-active">{item.label}</span>;
  }

  return (
    <button
      className="breadcrumb-link"
      onClick={() => handleBreadcrumbClick(item.href, navigate)}
      type="button"
    >
      {item.label}
    </button>
  );
};

const createSeparator = (index: number) => {
  return (
    <span key={`separator-${index}`} className="breadcrumb-separator">
      /
    </span>
  );
};

const createBreadcrumbItem = (
  item: BreadcrumbItem,
  index: number,
  navigate: (path: string) => void,
  totalItems: number,
) => {
  return (
    <React.Fragment key={item.label}>
      {createBreadcrumbLink(item, navigate)}
      {index < totalItems - 1 && createSeparator(index)}
    </React.Fragment>
  );
};

const createBreadcrumbStyles = () => {
  return (
    <style jsx>
      {`
        .breadcrumbs-container {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
          padding: 8px 0;
          font-size: 14px;
        }

        .breadcrumb-link {
          background: none;
          border: none;
          color: #666;
          cursor: pointer;
          font-size: 14px;
          font-weight: 400;
          padding: 0;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .breadcrumb-link:hover {
          color: #1976d2;
          text-decoration: underline;
        }

        .breadcrumb-active {
          color: #1976d2;
          font-weight: 500;
          font-size: 14px;
        }

        .breadcrumb-separator {
          color: #9ca3af;
          font-weight: 300;
          margin: 0 4px;
        }

        .dark .breadcrumb-link {
          color: #9ca3af;
        }

        .dark .breadcrumb-link:hover {
          color: #3b82f6;
        }

        .dark .breadcrumb-active {
          color: #3b82f6;
        }

        .dark .breadcrumb-separator {
          color: #6b7280;
        }
      `}
    </style>
  );
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ activeTab, selectedModel }) => {
  const navigate = useNavigate();
  const breadcrumbItems = createBreadcrumbItems(activeTab, selectedModel);

  return (
    <div className="breadcrumbs-container">
      {createBreadcrumbStyles()}
      {breadcrumbItems.map((item, index) =>
        createBreadcrumbItem(item, index, navigate, breadcrumbItems.length),
      )}
    </div>
  );
};

export default Breadcrumbs;
