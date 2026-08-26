import { MealDish } from "../model/dish.model";
import { Meal } from "../model/meal.model";
import { PropertySummary } from "../model/properties.model";

export interface MealResponse {
  id: number;
  timestamp: number;
  tzOffsetMin: number;
  dishes: MealDish[];
  summaryComplete: boolean;
  summary: PropertySummary[];
}

export function mapMealResponseToMeal(mealResponse: MealResponse): Meal {
  return {
  id: mealResponse.id,
  timestamp: mealResponse.timestamp,
  tzOffsetMin: mealResponse.tzOffsetMin,
  dishes: [],
  summaryComplete: false,
  summary: []
};
}
