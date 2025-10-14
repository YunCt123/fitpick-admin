import React from 'react';
import { DollarSign, CheckCircle, Clock } from "lucide-react";
import StatsGrid, { type StatCard } from '../ui/StatsGrid';

interface TransactionStats {
  total: number;
  completed: number;
  pending: number;
  failed: number;
  totalAmount: number;
}

interface TransactionStatsProps {
  stats: TransactionStats | null;
  loading?: boolean;
}

const TransactionStats: React.FC<TransactionStatsProps> = ({ stats, loading = false }) => {
  // Handle null stats
  if (!stats) {
    const emptyStats = {
      total: 0,
      completed: 0,
      pending: 0,
      failed: 0,
      totalAmount: 0
    };
    stats = emptyStats;
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const statCards: StatCard[] = [
    {
      label: 'Total Transactions',
      value: formatCurrency(stats.totalAmount),
      icon: DollarSign,
      bgColor: 'bg-gradient-to-r from-green-400 to-green-600',
      iconColor: 'text-white',
      textColor: 'text-black'
    },
    {
      label: 'Paid',
      value: `${stats.completed} (${stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%)`,
      icon: CheckCircle,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      textColor: 'text-green-700'
    },
    {
      label: 'Pending',
      value: `${stats.pending} (${stats.total > 0 ? Math.round((stats.pending / stats.total) * 100) : 0}%)`,
      icon: Clock,
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      textColor: 'text-yellow-700'
    }
  ];

  return (
    <StatsGrid cards={statCards} loading={loading} />
  );
};

export default TransactionStats;
