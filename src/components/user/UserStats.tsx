import React from 'react';
import { Users, UserCheck, UserX, Crown } from "lucide-react";
import StatsGrid, { type StatCard } from '../ui/StatsGrid';

interface UserStatsData {
  total: number;
  active: number;
  inactive: number;
  premium: number;
  admin: number;
}

interface UserStatsProps {
  users: any[];
  loading?: boolean;
}

const UserStats: React.FC<UserStatsProps> = ({ users, loading = false }) => {
  // Calculate stats from users array
  const calculateStats = (): UserStatsData => {
    if (!users || users.length === 0) {
      return {
        total: 0,
        active: 0,
        inactive: 0,
        premium: 0,
        admin: 0
      };
    }

    const total = users.length;
    const active = users.filter(user => user.status === true).length;
    const inactive = users.filter(user => user.status === false).length;
    const premium = users.filter(user => user.roleId === 3).length; // Premium role
    const admin = users.filter(user => user.roleId === 4).length; // Admin role

    return { total, active, inactive, premium, admin };
  };

  const stats = calculateStats();

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
    {
      label: 'Premium Users',
      value: `${stats.premium} (${stats.total > 0 ? Math.round((stats.premium / stats.total) * 100) : 0}%)`,
      icon: Crown,
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      textColor: 'text-yellow-700'
    },
  ];

  return <StatsGrid cards={statCards} loading={loading} />;
};

export default UserStats;