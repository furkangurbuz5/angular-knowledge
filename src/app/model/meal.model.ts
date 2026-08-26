import { Dish } from './dish.model';
import { MealDishIngredient } from './ingredient.model';
import { PropertySummary } from './properties.model';

export interface Meal {
  id: number;
  timestamp: number;
  tzOffsetMin: number;
  dishes: Dish[];
  summaryComplete: boolean;
  summary: PropertySummary[];
}

export interface MealDish {
  id: number;
  mealId: number;
  dishId: number;
  dishes: MealDishIngredient[];
}
