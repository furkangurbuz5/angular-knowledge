import { StatItem } from './person-stats.model';
import { Ingredient } from './ingredient.model';

export interface FoodStats {
  totalFoods: number;
  propertyStats?: StatItem[];
  foodStats: StatItem[];
}

export function calculateFoodStats(foods: Ingredient[]): FoodStats {
  const totalFoods = foods.length;

  const calculateDistribution = (key: keyof Ingredient): StatItem[] => {
    const counts: Record<string, number> = {};
    foods.forEach((person) => {
      const value = person[key];
      counts[value] = (counts[value] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([label, count]) => ({
        label,
        count,
        percentage: totalFoods > 0 ? (count / totalFoods) * 100 : 0,
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .filter((item) => {
        return item.percentage >= 0.5;
      });
  };

  return {
    totalFoods: totalFoods,
    foodStats: calculateDistribution('name'),
  };
}
