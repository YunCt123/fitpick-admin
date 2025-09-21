import React from 'react';
import { Clock, DollarSign, Users, Star } from 'lucide-react';

interface BlogStats {
  total: number;
  published: number;
  draft: number;  
  averageReadingTime: number;
}

interface BlogStatsProps {
  stats: BlogStats;
  loading: boolean;
}

const BlogStats: React.FC<BlogStatsProps> = ({ stats, loading }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const statCards = [
    {
      label: 'Total Meals',
      value: loading ? '...' : stats.total.toString(),
      icon: Users,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      label: 'Published Blogs',
      value: loading ? '...' : stats.published.toString(),
      icon: Star,
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
    },
    {
      label: 'Average Reading Time',
      value: loading ? '...' : `${Math.round(stats.averageReadingTime)} mins`,
      icon: DollarSign,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      label: 'Avg Reading Time',
      value: loading ? '...' : `${Math.round(stats.averageReadingTime)} mins`,
      icon: Clock,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {statCards.map((card, index) => {
        const IconComponent = card.icon;
        return (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.label}</p>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
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

export default BlogStats;