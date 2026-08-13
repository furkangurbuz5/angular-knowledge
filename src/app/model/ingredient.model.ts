import { PropertyWithValue } from './properties.model';

export interface Ingredient {
  id: number;
  name: string;
  servingSize: number;
  unit: string;
}

export interface IngredientProperties {
  id: number;
  ingredientId: number;
  propertyId: number;
  value: number;
}

export interface IngredientWithProperties {
  ingredient: Ingredient;
  properties: PropertyWithValue[];
}
