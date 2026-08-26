export interface AddDishToMealRequest {
  dishId: number;
}

export interface AddIngredientToMealDishRequest {
  ingredientId: number;
  unitId: number;
}

export interface ModifyIngredientInMealDishRequest {
  quantity: number;
}
