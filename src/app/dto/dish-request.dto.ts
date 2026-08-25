export interface CreateDishRequest {
  name: string;
}

export interface AddFoodToDishRequest {
  ingredient_id: number;
  quantity: number;
}

export interface DeleteFoodFromDishRequest {
  ingredient_id: number;
}

export interface UpdateFoodRequest {
  ingredientId: number;
  quantity: number;
}
