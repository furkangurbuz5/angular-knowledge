import { Meal } from "../model/meal.model";

export interface MealResponse {
  id: number;
  timestamp: number;
  tzOffsetTime: number;
}

export function mapMealResponseToMeal(mealResponse: MealResponse): Meal {
  return {
    id: mealResponse.id,
    timestamp: mealResponse.timestamp,
    tzOffsetTime: mealResponse.tzOffsetTime,
  };
}
