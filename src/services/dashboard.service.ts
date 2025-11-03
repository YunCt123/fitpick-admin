import { apiUtils } from '../api/axios';
import type { ApiResponse } from '../models/ApiResponse';

export interface DashboardStats {
  totalUsers: number;
  revenue: number;
  orders: number;
  products: number;
}

export const dashboardService = {
  /**
   * Get dashboard statistics
   */
  getStats: async (): Promise<ApiResponse<DashboardStats>> => {
    const response = await apiUtils.get<ApiResponse<DashboardStats>>('/api/admin/stats');
    return response.data;
  }
};

