import React from 'react';
import { cn } from '~/utils';

interface Tab {
  id: string;
  label: string;
}

interface AgentTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function AgentTabs({ tabs, activeTab, onTabChange }: AgentTabsProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap justify-center gap-2 rounded-lg bg-white p-2 shadow-sm dark:bg-gray-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'rounded-md px-4 py-2 text-sm font-medium transition-all duration-200',
              'hover:bg-gray-100 dark:hover:bg-gray-700',
              activeTab === tab.id
                ? 'bg-blue-500 text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-300',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
