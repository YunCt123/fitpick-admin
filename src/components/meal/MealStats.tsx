import React from 'react';
import { Clock, Users, Star } from 'lucide-react';
import StatsGrid, { type StatCard } from '../ui/StatsGrid';

interface MealStats {
  total: number;
  premium: number;
  averageCookingTime: number;
}

interface MealStatsProps {
  stats: MealStats;
  loading: boolean;
}

const MealStats: React.FC<MealStatsProps> = ({ stats, loading }) => {
  const statCards: StatCard[] = [
    {
      label: 'Total Meals',
      value: stats.total.toString(),
      icon: Users,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      label: 'Premium Meals',
      value: stats.premium.toString(),
      icon: Star,
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
    },
    {
      label: 'Avg Cooking Time',
      value: `${Math.round(stats.averageCookingTime)} mins`,
      icon: Clock,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
  ];

  return <StatsGrid cards={statCards} loading={loading} />;
};

export default MealStats;