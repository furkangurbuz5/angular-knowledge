import { IngredientWithQuantity, MealDishIngredient } from './ingredient.model';

export interface Dish {
  id: number;
  name: string;
}

export interface DishWithFoods {
  id: number,
  name: string;
  foods: IngredientWithQuantity[];
  dishProperties: DishProperties[];
}

export interface DishProperties {
  propertyId: number;
  propertyName: string;
  unit: string;
  propertyAmount: number;
}

export interface MealDish {
  id: number;
  mealId: number;
  dishId: number;
  ingredients: MealDishIngredient[];
}
