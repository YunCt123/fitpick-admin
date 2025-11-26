import React, { useEffect, useState } from 'react';
import { Users, UserCheck, UserX } from "lucide-react";
import StatsGrid, { type StatCard } from '../ui/StatsGrid';
import { userService } from '../../services/user.service';

interface UserStatsData {
  total: number;
  active: number;
  inactive: number;
}

interface UserStatsProps {
  users: any[];
  totalItems?: number;
  loading?: boolean;
}

const UserStats: React.FC<UserStatsProps> = ({ users, totalItems, loading: propsLoading = false }) => {
  const [stats, setStats] = useState<UserStatsData>({
    total: 0,
    active: 0,
    inactive: 0,
  });
  const [statsLoading, setStatsLoading] = useState(false);

  // Fetch stats from API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setStatsLoading(true);
        const response = await userService.getUserStats();
        
        if (response.success && response.data) {
          setStats(response.data);
        }
      } catch (error) {
        console.error('Error fetching user stats:', error);
        // Fallback to calculating from current page users
        setStats({
          total: totalItems ?? users.length,
          active: users.filter(u => u.status === true).length,
          inactive: users.filter(u => u.status === false).length,
        });
      } finally {
        setStatsLoading(false);
      }
    };

    fetchStats();
  }, [totalItems, users]);

  const loading = propsLoading || statsLoading;

  const statCards: StatCard[] = [
    {
      label: 'Total Users',
      value: stats.total.toString(),
      icon: Users,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      label: 'Active Users',
      value: `${stats.active} (${stats.total > 0 ? Math.round((stats.active / stats.total) * 100) : 0}%)`,
      icon: UserCheck,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      textColor: 'text-green-700'
    },
    {
      label: 'Inactive Users',
      value: `${stats.inactive} (${stats.total > 0 ? Math.round((stats.inactive / stats.total) * 100) : 0}%)`,
      icon: UserX,
      bgColor: 'bg-red-100',
      iconColor: 'text-red-600',
      textColor: 'text-red-700'
    },
  ];

  return <StatsGrid cards={statCards} loading={loading} />;
};

export default UserStats;