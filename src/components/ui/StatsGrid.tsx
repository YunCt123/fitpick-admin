import React from 'react';
import type { LucideIcon } from 'lucide-react';

export interface StatCard {
  label: string;
  value: string | number;
  icon: LucideIcon;
  bgColor: string;
  iconColor: string;
  textColor?: string;
}

interface StatsGridProps {
  cards: StatCard[];
  loading?: boolean;
  className?: string;
}

const StatsGrid: React.FC<StatsGridProps> = ({ 
  cards, 
  loading = false, 
  className = "grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" 
}) => {
  return (
    <div className={className}>
      {cards.map((card, index) => {
        const IconComponent = card.icon;
        return (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.label}</p>
                <p className={`text-2xl font-bold ${card.textColor || 'text-gray-900'}`}>
                  {loading ? '...' : card.value}
                </p>
              </div>
              <div className={`h-12 w-12 ${card.bgColor} rounded-lg flex items-center justify-center`}>
                <IconComponent className={`h-6 w-6 ${card.iconColor}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsGrid;