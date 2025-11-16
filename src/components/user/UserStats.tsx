import React, { useEffect, useState } from 'react';
import { Users, UserCheck, UserX, Crown } from "lucide-react";
import StatsGrid, { type StatCard } from '../ui/StatsGrid';
import { userService } from '../../services/user.service';

interface UserStatsData {
  total: number;
  active: number;
  inactive: number;
  premium: number;
  admin: number;
}

interface UserStatsProps {
  users: any[];
  totalItems?: number;
  loading?: boolean;
}

const UserStats: React.FC<UserStatsProps> = ({ users, totalItems, loading: propsLoading = false }) => {
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [statsLoading, setStatsLoading] = useState(false);

  // Fetch all users for accurate stats calculation
  useEffect(() => {
    const fetchAllUsersForStats = async () => {
      // Use totalItems for accurate total count
      if (!totalItems || totalItems <= 0) {
        // Fallback to current page users if no totalItems
        setAllUsers(users || []);
        return;
      }

      // If totalItems is small (<= 100), fetch all users for accurate stats
      // Otherwise, use current page users and estimate
      if (totalItems <= 100) {
        try {
          setStatsLoading(true);
          // Fetch all users with page size matching total items
          const response = await userService.getUsers({ 
            page: 1, 
            pageSize: totalItems
          });
          
          if (response?.data?.items && Array.isArray(response.data.items)) {
            setAllUsers(response.data.items);
          } else {
            // Fallback to current page users
            setAllUsers(users || []);
          }
        } catch (error) {
          console.error('Error fetching all users for stats:', error);
          // Fallback to using current page users
          setAllUsers(users || []);
        } finally {
          setStatsLoading(false);
        }
      } else {
        // For large datasets, use current page users and calculate based on ratio
        setAllUsers(users || []);
      }
    };

    fetchAllUsersForStats();
  }, [totalItems]); // Only depend on totalItems to avoid infinite loop

  // Calculate stats from all users for accuracy
  const calculateStats = (): UserStatsData => {
    const usersForCalculation = allUsers.length > 0 ? allUsers : (users || []);
    const total = totalItems ?? usersForCalculation.length;
    
    if (usersForCalculation.length === 0) {
      return {
        total,
        active: 0,
        inactive: 0,
        premium: 0,
        admin: 0
      };
    }

    // Calculate counts from fetched users
    const activeCount = usersForCalculation.filter(user => user.status === true).length;
    const inactiveCount = usersForCalculation.filter(user => user.status === false).length;
    const premiumCount = usersForCalculation.filter(user => user.roleId === 3).length; // Premium role
    const adminCount = usersForCalculation.filter(user => user.roleId === 4).length; // Admin role

    // If we fetched all users (totalItems <= 100), use exact counts
    if (totalItems && totalItems <= 100 && usersForCalculation.length === totalItems) {
      return {
        total: totalItems,
        active: activeCount,
        inactive: inactiveCount,
        premium: premiumCount,
        admin: adminCount
      };
    }

    // If we have more users than fetched, estimate based on ratio
    if (totalItems && totalItems > usersForCalculation.length && usersForCalculation.length > 0) {
      const ratio = usersForCalculation.length / totalItems;
      return {
        total: totalItems,
        active: Math.round(activeCount / ratio),
        inactive: Math.round(inactiveCount / ratio),
        premium: Math.round(premiumCount / ratio),
        admin: Math.round(adminCount / ratio)
      };
    }

    // Default: use exact counts from available users
    return {
      total,
      active: activeCount,
      inactive: inactiveCount,
      premium: premiumCount,
      admin: adminCount
    };
  };

  const stats = calculateStats();
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