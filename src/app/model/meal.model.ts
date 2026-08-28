import { MealDish } from './dish.model';
import { PropertySummary } from './properties.model';

export interface Meal {
  id: number;
  timestamp: number;
  tzOffsetMin: number;
  dishes: MealDish[];
  summaryComplete: boolean;
  summary: PropertySummary[];
}
