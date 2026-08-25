import { IngredientWithQuantity } from './ingredient.model';

export interface Dish {
  id: number;
  name: string;
}

export interface DishWithFoods {
  dish: Dish;
  foods: IngredientWithQuantity[];
  dishProperties: DishProperties[];
}

export interface DishProperties {
  propertyId: number;
  propertyName: string;
  unit: string;
  propertyAmount: number;
}
