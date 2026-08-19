import {
  Ingredient,
  IngredientProperties,
  IngredientWithQuantity,
} from '../model/ingredient.model';

export interface IngredientResponse {
  id: number;
  name: string;
  servingSize: number;
  unit: string;
}

export interface IngredientWithQuantityResponse {
  id: number;
  name: string;
  servingSize: number;
  unit: string;
  quantity: number;
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

export function mapIngredientWithQuantityResponseToIngredient(
  ingredientResponse: IngredientWithQuantityResponse,
): IngredientWithQuantity {
  return {
    id: ingredientResponse.id,
    name: ingredientResponse.name,
    servingSize: ingredientResponse.servingSize,
    unit: ingredientResponse.unit,
    quantity: ingredientResponse.quantity,
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
