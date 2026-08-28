export interface AddDishToMealRequest {
  dishId: number;
}

export interface AddIngredientToMealDishRequest {
  ingredientId: number;
}

export interface ModifyIngredientInMealDishRequest {
  quantity: number;
}
