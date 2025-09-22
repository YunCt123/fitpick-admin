import React from 'react';
import { FileText, Eye, Clock, TrendingUp } from 'lucide-react';

interface BlogStats {
  total: number;
  published: number;
  draft: number;  
  averageReadingTime: number;
  totalViews?: number;
  growthRate?: number;
}

interface BlogStatsProps {
  stats: BlogStats;
  loading: boolean;
}

const BlogStats: React.FC<BlogStatsProps> = ({ stats, loading }) => {
  const statCards = [
    {
      label: 'Tổng số Blog',
      value: loading ? '...' : stats.total.toLocaleString(),
      icon: FileText,
      color: 'bg-gradient-to-r from-blue-400 to-blue-600',
      subtitle: 'Tổng bài viết'
    },
    {
      label: 'Blog đã xuất bản',
      value: loading ? '...' : stats.published.toLocaleString(),
      icon: Eye,
      color: 'bg-gradient-to-r from-green-400 to-green-600',
      subtitle: 'Đang hoạt động'
    },
    {
      label: 'Blog bản nháp',
      value: loading ? '...' : stats.draft.toLocaleString(),
      icon: FileText,
      color: 'bg-gradient-to-r from-purple-400 to-purple-600',
      subtitle: 'Chưa xuất bản'
    },
    {
      label: 'Thời gian đọc TB',
      value: loading ? '...' : `${Math.round(stats.averageReadingTime)} phút`,
      icon: Clock,
      color: 'bg-gradient-to-r from-orange-400 to-orange-600',
      subtitle: 'Trung bình'
    },
  ];

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`h-12 w-12 ${card.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    {!loading && (index === 1 || index === 2) && (
                      <div className="text-right">
                        <div className="text-xs text-gray-500 mb-1">% tổng blog</div>
                        <div className="text-sm font-semibold text-gray-700">
                          {index === 1 
                            ? `${Math.round((stats.published / stats.total) * 100)}%`
                            : `${Math.round((stats.draft / stats.total) * 100)}%`
                          }
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-2">{card.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{card.label}</div>
                  <div className="text-xs text-gray-500 mt-1">{card.subtitle}</div>
                  
                  {/* Progress bar for published vs draft */}
                  {(index === 1 || index === 2) && !loading && stats.total > 0 && (
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            index === 1 ? 'bg-green-500' : 'bg-purple-500'
                          }`}
                          style={{ 
                            width: `${index === 1 
                              ? (stats.published / stats.total) * 100 
                              : (stats.draft / stats.total) * 100}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BlogStats;