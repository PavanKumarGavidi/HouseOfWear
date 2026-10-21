import { useState } from 'react';
import { twMerge } from '../../utils/cn';

interface ProductTabsProps {
  description: string;
  fabricCare: string;
  shippingReturns: string;
}

export function ProductTabs({ description, fabricCare, shippingReturns }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'fabric', label: 'Fabric & Care' },
    { id: 'shipping', label: 'Shipping & Returns' },
  ];

  const content: Record<string, string> = {
    description,
    fabric: fabricCare,
    shipping: shippingReturns,
  };

  return (
    <div className="border-t border-brand-200 dark:border-brand-700 pt-6">
      {/* Tab Headers */}
      <div className="flex gap-6 border-b border-brand-200 dark:border-brand-700 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={twMerge(
              'pb-3 text-sm font-medium transition-colors relative',
              activeTab === tab.id
                ? 'text-brand-900 dark:text-white'
                : 'text-brand-500 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300'
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-900 dark:bg-white" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="prose prose-sm max-w-none text-brand-700 dark:text-brand-300">
        <div className="whitespace-pre-line">{content[activeTab]}</div>
      </div>
    </div>
  );
}
