import { apiUtils } from '../api/axios';
import type { ApiResponse } from '../models/ApiResponse';

export interface DashboardStats {
  totalUsers: number;
  revenue: number;
  transactions: number;
  products: number;
}

export const dashboardService = {
  /**
   * Get dashboard statistics
   */
  getStats: async (): Promise<ApiResponse<DashboardStats>> => {
    const response = await apiUtils.get<ApiResponse<any>>('/api/admin/stats');
    // Map 'orders' from backend to 'transactions' in frontend
    if (response.data?.data) {
      response.data.data = {
        ...response.data.data,
        transactions: response.data.data.orders || response.data.data.transactions || 0
      };
    }
    return response.data as ApiResponse<DashboardStats>;
  }
};

