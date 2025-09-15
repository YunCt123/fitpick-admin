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
