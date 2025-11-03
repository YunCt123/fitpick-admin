import { apiUtils } from '../api/axios';
import type { ApiResponse } from '../models/ApiResponse';

export interface Category {
  id: number;
  name: string;
  vietnameseName?: string;
}

export interface MealStatus {
  id: number;
  name: string;
  vietnameseName?: string;
}

export const filterService = {
  getCategories: async (): Promise<ApiResponse<Category[]>> => {
    try {
      const response = await apiUtils.get<ApiResponse<any[]>>('/api/filter/categories');
      if (response.data.success && response.data.data) {
        return {
          ...response.data,
          data: response.data.data.map((item: any) => ({
            id: item.id,
            name: item.name,
            vietnameseName: item.vietnameseName || item.name,
          })),
        };
      }
      return { success: false, message: 'No categories found', data: [] };
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  getMealStatuses: async (): Promise<ApiResponse<MealStatus[]>> => {
    try {
      const response = await apiUtils.get<ApiResponse<any[]>>('/api/filter/meal-statuses');
      if (response.data.success && response.data.data) {
        return {
          ...response.data,
          data: response.data.data.map((item: any) => ({
            id: item.id,
            name: item.name,
            vietnameseName: item.vietnameseName || item.name,
          })),
        };
      }
      return { success: false, message: 'No statuses found', data: [] };
    } catch (error) {
      console.error('Error fetching meal statuses:', error);
      throw error;
    }
  },

  getDietTypes: async (): Promise<ApiResponse<string[]>> => {
    try {
      const response = await apiUtils.get<ApiResponse<any[]>>('/api/filter/diet-types');
      if (response.data.success && response.data.data) {
        const dietTypeNames = response.data.data.map((item: any) => item.name || item.vietnameseName || item).filter(Boolean);
        return {
          ...response.data,
          data: dietTypeNames,
        };
      }
      return { success: false, message: 'No diet types found', data: [] };
    } catch (error) {
      console.error('Error fetching diet types:', error);
      throw error;
    }
  },
};
