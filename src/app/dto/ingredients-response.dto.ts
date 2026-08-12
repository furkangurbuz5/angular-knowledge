import { Ingredient } from '../model/ingredient.model';

export interface IngredientResponse {
  id: number;
  name: string;
  servingSize: number;
  unit: string;
}

export function mapIngredientResponseToIngredient(
  ingredientResponse: IngredientResponse,
): Ingredient {
  return {
    id: ingredientResponse.id,
    name: ingredientResponse.name,
    servingSize: ingredientResponse.servingSize,
    unit: ingredientResponse.unit,
  };
}
