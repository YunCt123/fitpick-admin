import axios from '../api/axios';
import type { Ingredient, CreateIngredientRequest, UpdateIngredientRequest } from '../models/IngredientModel';
import type { ApiResponse } from '../models/ApiResponse';

const BASE_URL = '/api/admin/ingredients';

export const ingredientService = {
  /**
   * Get all ingredients with optional filters and pagination
   */
  getAllIngredients: async (params?: {
    name?: string;
    type?: string;
    unit?: string;
    status?: boolean;
    onlyActive?: boolean;
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortDesc?: boolean;
  }): Promise<ApiResponse<any>> => {
    try {
      const requestParams: any = {
        name: params?.name,
        type: params?.type,
        unit: params?.unit,
        sortBy: params?.sortBy || "ingredientid",
        sortDesc: params?.sortDesc !== undefined ? params.sortDesc : true,
      };

      // Use status if provided, otherwise use onlyActive
      if (params?.status !== undefined) {
        requestParams.status = params.status;
      } else if (params?.onlyActive !== undefined) {
        requestParams.status = params.onlyActive;
      }

      // Add pagination params if provided
      if (params?.page && params?.pageSize) {
        requestParams.page = params.page;
        requestParams.pageSize = params.pageSize;
      }

      const response = await axios.get<ApiResponse<any>>(BASE_URL, {
        params: requestParams
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

      // Fallback to old format (non-paginated array)
      return response.data;
    } catch (error) {
      console.error('Error fetching ingredients:', error);
      throw error;
    }
  },

  /**
   * Get ingredient by ID
   */
  getIngredientById: async (id: number): Promise<ApiResponse<Ingredient>> => {
    try {
      const response = await axios.get<ApiResponse<Ingredient>>(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching ingredient with id ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create new ingredient
   */
  createIngredient: async (data: CreateIngredientRequest): Promise<ApiResponse<Ingredient>> => {
    try {
      const response = await axios.post<ApiResponse<Ingredient>>(BASE_URL, data);
      return response.data;
    } catch (error) {
      console.error('Error creating ingredient:', error);
      throw error;
    }
  },

  /**
   * Get ingredient statistics
   */
  getIngredientStats: async (params?: {
    type?: string;
    status?: boolean;
  }): Promise<ApiResponse<{
    total: number;
    active: number;
    inactive: number;
    totalTypes: number;
  }>> => {
    // Fetch all ingredients and calculate stats
    const allIngredients = await ingredientService.getAllIngredients({
      type: params?.type,
      status: params?.status
    });

    let ingredients: Ingredient[] = [];
    if (Array.isArray(allIngredients.data)) {
      ingredients = allIngredients.data;
    }

    const total = ingredients.length;
    const active = ingredients.filter(ing => ing.status === true).length;
    const inactive = ingredients.filter(ing => ing.status === false).length;
    const types = new Set(ingredients.map(ing => ing.type).filter(Boolean));

    return {
      success: true,
      data: { total, active, inactive, totalTypes: types.size },
      message: 'Stats calculated from ingredients'
    };
  },

  /**
   * Update ingredient
   */
  updateIngredient: async (id: number, data: UpdateIngredientRequest): Promise<ApiResponse<Ingredient>> => {
    try {
      const response = await axios.put<ApiResponse<Ingredient>>(`${BASE_URL}/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating ingredient with id ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete ingredient
   */
  deleteIngredient: async (id: number): Promise<ApiResponse<string>> => {
    try {
      const response = await axios.delete<ApiResponse<string>>(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting ingredient with id ${id}:`, error);
      throw error;
    }
  }
};
