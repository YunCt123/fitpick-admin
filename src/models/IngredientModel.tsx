export interface Ingredient {
  ingredientid: number;
  name: string;
  type?: string;
  unit?: string;
  status?: boolean;
}

export interface CreateIngredientRequest {
  name: string;
  type?: string;
  unit?: string;
}

export interface UpdateIngredientRequest {
  name: string;
  type?: string;
  unit?: string;
  status: boolean;
}

