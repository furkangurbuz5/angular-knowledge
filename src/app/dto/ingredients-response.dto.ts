import { Ingredient, IngredientProperties } from '../model/ingredient.model';

export interface IngredientResponse {
  id: number;
  name: string;
  servingSize: number;
  unit: string;
}

export interface IngredientPropertiesResponse {
  id: number;
  ingredientId: number;
  propertyId: number;
  value: number;
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

export function mapIngredientPropertiesResponseToIngredientProperties(
  ingredientResponse: IngredientPropertiesResponse,
): IngredientProperties {
  return {
    id: ingredientResponse.id,
    ingredientId: ingredientResponse.ingredientId,
    propertyId: ingredientResponse.propertyId,
    value: ingredientResponse.value,
  };
}
