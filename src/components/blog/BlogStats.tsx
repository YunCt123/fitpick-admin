import React from 'react';
import { FileText, Eye, Clock, Edit } from 'lucide-react';
import StatsGrid, { type StatCard } from '../ui/StatsGrid';

interface BlogStats {
  total: number;
  published: number;
  draft: number;  
  averageReadingTime?: number;
  totalViews?: number;
  growthRate?: number;
}

interface BlogStatsProps {
  stats: BlogStats;
  loading: boolean;
}

const BlogStats: React.FC<BlogStatsProps> = ({ stats, loading }) => {
  const statCards: StatCard[] = [
    {
      label: 'Total Blogs',
      value: stats.total.toLocaleString(),
      icon: FileText,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      label: 'Published Blogs',
      value: stats.published.toLocaleString(),
      icon: Eye,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      label: 'Draft Blogs',
      value: stats.draft.toLocaleString(),
      icon: Edit,
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    },
    {
      label: 'Avg Reading Time',
      value: `${Math.round(stats.averageReadingTime || 0)} mins`,
      icon: Clock,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
  ];

  return <StatsGrid cards={statCards} loading={loading} />;
};

export default BlogStats;