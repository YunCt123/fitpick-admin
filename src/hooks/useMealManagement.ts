import { useState, useEffect } from 'react';
import { mealService, type MealQueryParams } from '../services/meal.service';
import type { Meal, CreateMealRequest, UpdateMealRequest } from '../models/MealModel';

export interface UseMealsResult {
  meals: Meal[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  createMeal: (mealData: CreateMealRequest) => Promise<void>;
  updateMeal: (id: number, mealData: UpdateMealRequest) => Promise<void>;
  deleteMeal: (id: number) => Promise<void>;
}

export const useMeals = (params?: MealQueryParams): UseMealsResult => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMeals = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await mealService.getMeals(params);
      
      if (response.success && response.data) {
        setMeals(response.data);
      } else {
        setError(response.message || 'Failed to fetch meals');
        setMeals([]);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching meals');
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  const createMeal = async (mealData: any) => {
    try {
      setError(null);
      const response = await mealService.createMeal(mealData);
      
      if (response.success) {
        await fetchMeals(); // Refresh the list
      } else {
        setError(response.message || 'Failed to create meal');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while creating meal');
      throw err;
    }
  };

  const updateMeal = async (id: number, mealData: any) => {
    try {
      setError(null);
      const response = await mealService.updateMeal(id, mealData);
      
      if (response.success) {
        await fetchMeals(); // Refresh the list
      } else {
        setError(response.message || 'Failed to update meal');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while updating meal');
      throw err;
    }
  };

  const deleteMeal = async (id: number) => {
    try {
      setError(null);
      const response = await mealService.deleteMeal(id);
      
      if (response.success) {
        await fetchMeals(); // Refresh the list
      } else {
        setError(response.message || 'Failed to delete meal');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while deleting meal');
      throw err;
    }
  };



  useEffect(() => {
    fetchMeals();
  }, [JSON.stringify(params)]); // Re-fetch when params change

  return {
    meals,
    loading,
    error,
    refetch: fetchMeals,
    createMeal,
    updateMeal,
    deleteMeal
  };
};

export interface UseMealStatsResult {
  stats: {
    total: number;
    premium: number;
    active: number;
    inactive: number;
    averagePrice: number;
    averageCookingTime: number;
    byDietType: Record<string, number>;
  };
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useMealStats = (): UseMealStatsResult => {
  const [stats, setStats] = useState({
    total: 0,
    premium: 0,
    active: 0,
    inactive: 0,
    averagePrice: 0,
    averageCookingTime: 0,
    byDietType: {}
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const statsData = await mealService.getMealsStats();
      setStats(statsData);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching statistics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats
  };
};

export interface UseMealResult {
  meal: Meal | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useMeal = (id: number): UseMealResult => {
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMeal = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await mealService.getMealById(id);
      
      if (response.success && response.data) {
        setMeal(response.data);
      } else {
        setError(response.message || 'Failed to fetch meal');
        setMeal(null);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching meal');
      setMeal(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchMeal();
    }
  }, [id]);

  return {
    meal,
    loading,
    error,
    refetch: fetchMeal
  };
};