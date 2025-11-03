import axios from '../api/axios';
import type { Meal, CreateMealRequest, UpdateMealRequest } from '../models/MealModel';
import type { ApiResponse } from '../models/ApiResponse';
import { MEAL } from '../constants/authURL';

export interface MealQueryParams {
  search?: string;
  diettype?: string;
  statusId?: number;
  categoryId?: number;
  isPremium?: boolean;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDesc?: boolean;
}

class MealService {
  private baseUrl = MEAL;

  /**
   * Get all meals with optional filtering (no pagination)
   */
  async getMeals(params?: MealQueryParams): Promise<ApiResponse<Meal[]>> {
    try {
      // Map frontend params to backend params
      const backendParams: any = {
        categoryId: params?.categoryId,
        dietType: params?.diettype,
        statusId: params?.statusId,
        search: params?.search,
        sortBy: params?.sortBy || "createdat",
        sortDesc: params?.sortDesc !== undefined ? params.sortDesc : true,
        page: params?.page || 0,
        pageSize: params?.pageSize || 0,
      };
      
      // Remove undefined values
      Object.keys(backendParams).forEach(key => 
        backendParams[key] === undefined && delete backendParams[key]
      );

      const response = await axios.get<ApiResponse<any>>(this.baseUrl, {
        params: backendParams
      });

      // Check if response is paginated
      if (params?.page && params?.pageSize && response.data.success && response.data.data?.items) {
        return {
          success: response.data.success,
          data: response.data.data.items,
          message: response.data.message,
          totalItems: response.data.data.totalItems,
          totalPages: response.data.data.totalPages
        } as any;
      }
      
      // Fallback to old format (non-paginated)
      const meals = response.data.success && response.data.data ? response.data.data : [];
      
      // Client-side filtering if needed (fallback)
      let filteredMeals = meals;
      if (params?.search && !params.page) {
        const searchLower = params.search.toLowerCase();
        filteredMeals = filteredMeals.filter((meal: Meal) => 
          meal.name?.toLowerCase().includes(searchLower) ||
          meal.description?.toLowerCase().includes(searchLower)
        );
      }
      
      if (params?.diettype && !params.page) {
        filteredMeals = filteredMeals.filter((meal: Meal) => meal.diettype === params.diettype);
      }
      
      if (params?.statusId !== undefined && !params.page) {
        filteredMeals = filteredMeals.filter((meal: Meal) => meal.statusId === params.statusId);
      }

      return {
        success: response.data.success,
        data: filteredMeals,
        message: response.data.message
      };
    } catch (error) {
      console.error('Error fetching meals:', error);
      throw error;
    }
  }

  /**
   * Get meal by ID
   */
  async getMealById(id: number): Promise<ApiResponse<Meal>> {
    try {
      const response = await axios.get<ApiResponse<Meal>>(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching meal with id ${id}:`, error);
      throw error;
    }
  }

  /**
   * Create new meal
   */
  async createMeal(mealData: CreateMealRequest): Promise<ApiResponse<Meal>> {
    try {
      const response = await axios.post<ApiResponse<Meal>>(this.baseUrl, mealData);
      return response.data;
    } catch (error) {
      console.error('Error creating meal:', error);
      throw error;
    }
  }

  /**
   * Update existing meal
   */
  async updateMeal(id: number, mealData: UpdateMealRequest): Promise<ApiResponse<Meal>> {
    try {
      const response = await axios.put<ApiResponse<Meal>>(`${this.baseUrl}/${id}`, mealData);
      return response.data;
    } catch (error) {
      console.error(`Error updating meal with id ${id}:`, error);
      throw error;
    }
  }

  /**
   * Delete meal
   */
  async deleteMeal(id: number): Promise<ApiResponse<null>> {
    try {
      const response = await axios.delete<ApiResponse<null>>(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting meal with id ${id}:`, error);
      throw error;
    }
  }

  /**
   * Toggle meal status (Active/Inactive)
   */
  async toggleMealStatus(id: number): Promise<ApiResponse<Meal>> {
    try {
      const meal = await this.getMealById(id);
      const newStatus = meal.data.statusId === 1 ? 0 : 1;
      
      const updatedMeal: UpdateMealRequest = {
        mealid: id,
        name: meal.data.name,
        description: meal.data.description,
        calories: meal.data.calories,
        cookingtime: meal.data.cookingtime,
        categoryId: meal.data.categoryId,
        diettype: meal.data.diettype,
        price: meal.data.price,
        isPremium: meal.data.isPremium,
        statusId: newStatus
      };
      
      return await this.updateMeal(id, updatedMeal);
    } catch (error) {
      console.error(`Error toggling meal status with id ${id}:`, error);
      throw error;
    }
  }

  /**
   * Toggle meal premium status
   */
  async togglePremiumStatus(id: number): Promise<ApiResponse<Meal>> {
    try {
      const meal = await this.getMealById(id);
      
      const updatedMeal: UpdateMealRequest = {
        mealid: id,
        name: meal.data.name,
        description: meal.data.description,
        calories: meal.data.calories,
        cookingtime: meal.data.cookingtime,
        categoryId: meal.data.categoryId,
        diettype: meal.data.diettype,
        price: meal.data.price,
        isPremium: !meal.data.isPremium,
        statusId: meal.data.statusId
      };
      
      return await this.updateMeal(id, updatedMeal);
    } catch (error) {
      console.error(`Error toggling premium status with id ${id}:`, error);
      throw error;
    }
  }

  /**
   * Upload meal image
   */
  async uploadMealImage(mealId: number, file: File): Promise<ApiResponse<any>> {
    try {
      const formData = new FormData();
      formData.append('File', file);

      const response = await axios.put<ApiResponse<any>>(
        `${this.baseUrl}/${mealId}/image`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error uploading image for meal with id ${mealId}:`, error);
      throw error;
    }
  }

  /**
   * Get meals statistics
   */
  async getMealsStats(): Promise<{
    total: number;
    premium: number;
    active: number;
    inactive: number;
    averagePrice: number;
    averageCookingTime: number;
    byDietType: Record<string, number>;
  }> {
    try {
      const response = await this.getMeals();
      const meals = response.data;

      if (!meals || meals.length === 0) {
        return {
          total: 0,
          premium: 0,
          active: 0,
          inactive: 0,
          averagePrice: 0,
          averageCookingTime: 0,
          byDietType: {}
        };
      }

      const stats = {
        total: meals.length,
        premium: meals.filter(meal => meal.isPremium).length,
        active: meals.filter(meal => meal.statusId === 1).length,
        inactive: meals.filter(meal => meal.statusId === 0).length,
        averagePrice: meals.reduce((sum, meal) => sum + meal.price, 0) / meals.length,
        averageCookingTime: meals.reduce((sum, meal) => sum + meal.cookingtime, 0) / meals.length,
        byDietType: meals.reduce((acc, meal) => {
          acc[meal.diettype] = (acc[meal.diettype] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
      };

      return stats;
    } catch (error) {
      console.error('Error fetching meal statistics:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const mealService = new MealService();
export default mealService;
