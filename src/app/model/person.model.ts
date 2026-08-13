import { IngredientWithProperties } from './ingredient.model';

export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  car: string;
  city: string;
  countryOfOrigin: string;
  bank: string;
}

export interface PersonWithIngredients{
  person: Person,
  ingredientWithProperties: IngredientWithProperties[],
}
