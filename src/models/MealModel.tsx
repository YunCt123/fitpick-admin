export interface Meal {
  mealid: number;
  name: string;
  description: string;
  calories: number;
  cookingtime: number;
  categoryId: number;
  diettype: string;
  price: number;
  statusId: number;
  createdby: number;
  createdat: string; // ISO datetime
  isPremium: boolean;
  createdbyNavigation: any | null; // tùy backend trả về
  status: any | null; // tùy backend trả về
  mealInstructions?: Array<{ instruction: string; stepNumber: number; instructionId?: number }>;
  mealIngredients?: Array<{ ingredientid?: number; ingredientId?: number; quantity: number; ingredient?: { ingredientid?: number; ingredientId?: number; name?: string } }>;
  protein?: number;
  carbs?: number;
  fat?: number;
  imageUrl?: string;
}


export interface CreateMealRequest{
  name: string;
  description: string;
  calories: number;
  cookingtime: number;
  categoryId: number;
  diettype: string;
  price: number;
  isPremium: boolean;
}

export interface UpdateMealRequest extends CreateMealRequest {
    mealid: number;
    statusId?: number;
}
