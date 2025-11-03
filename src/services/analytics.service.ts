import { apiUtils } from '../api/axios';
import type { ApiResponse } from '../models/ApiResponse';

export interface AnalyticsData {
  kpi: {
    totalUsers: number;
    dau: number;
    mau: number;
    weeklyGrowth: number;
  };
  gender: {
    male: number;
    female: number;
    other: number;
    malePercentage: number;
    femalePercentage: number;
    otherPercentage: number;
  };
  ageGroups: Array<{
    name: string;
    count: number;
    percentage: number;
    description: string;
  }>;
  dietPlans: Array<{
    name: string;
    value: number;
    percentage: number;
  }>;
  popularMeals: Array<{
    rank: number;
    name: string;
    orders: number;
    percentage: number;
    trend: string;
  }>;
  totalMealOrders: number;
  periods?: {
    userPeriod: string;
    dietPeriod: string;
    mealPeriod: string;
  };
}

export interface AnalyticsFilters {
  userPeriod?: 'month' | 'quarter' | 'year';
  dietPeriod?: 'month' | 'quarter' | 'year';
  mealPeriod?: 'week' | 'month' | 'quarter';
}

export const analyticsService = {
  /**
   * Get analytics data
   */
  getAnalytics: async (filters?: AnalyticsFilters): Promise<ApiResponse<AnalyticsData>> => {
    const params: any = {};
    if (filters?.userPeriod) params.userPeriod = filters.userPeriod;
    if (filters?.dietPeriod) params.dietPeriod = filters.dietPeriod;
    if (filters?.mealPeriod) params.mealPeriod = filters.mealPeriod;
    
    const response = await apiUtils.get<ApiResponse<AnalyticsData>>('/api/admin/analytics', params);
    return response.data;
  }
};

