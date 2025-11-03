import React from 'react';
import { Package, CheckCircle, XCircle, TrendingUp } from 'lucide-react';
import StatsGrid, { type StatCard } from '../ui/StatsGrid';

interface IngredientStats {
  total: number;
  active: number;
  inactive: number;
  totalTypes?: number;
}

interface IngredientStatsProps {
  stats: IngredientStats;
  loading: boolean;
}

const IngredientStats: React.FC<IngredientStatsProps> = ({ stats, loading }) => {
  const statCards: StatCard[] = [
    {
      label: 'Total Ingredients',
      value: stats.total.toLocaleString(),
      icon: Package,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      label: 'Active Ingredients',
      value: stats.active.toLocaleString(),
      icon: CheckCircle,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      label: 'Inactive Ingredients',
      value: stats.inactive.toLocaleString(),
      icon: XCircle,
      bgColor: 'bg-red-100',
      iconColor: 'text-red-600'
    },
    {
      label: 'Types',
      value: (stats.totalTypes || 0).toLocaleString(),
      icon: TrendingUp,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
  ];

  return <StatsGrid cards={statCards} loading={loading} />;
};

export default IngredientStats;

