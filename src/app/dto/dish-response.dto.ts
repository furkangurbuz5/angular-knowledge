import { IngredientWithQuantityResponse } from './ingredients-response.dto';
import { Dish } from '../model/dish.model';

export interface DishResponse {
  id: number;
  name: string;
}

export function mapDishResponseToDish(response: DishResponse): Dish {
  return {
    id: response.id,
    name: response.name,
  };
}

export interface DishWithFoodsResponse {
  dish: DishResponse;
  ingredients: IngredientWithQuantityResponse[];
  dishProperties: DishPropertiesResponse[];
}

export interface DishPropertiesResponse {
  propertyId: number;
  propertyName: string;
  unit: string;
  propertyAmount: number;
}

export function mapDishPropertyResponseToDish(
  response: DishPropertiesResponse,
): DishPropertiesResponse {
  return {
    propertyId: response.propertyId,
    propertyName: response.propertyName,
    unit: response.unit,
    propertyAmount: response.propertyAmount,
  };
}
