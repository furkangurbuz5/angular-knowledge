import { IngredientWithQuantity } from './ingredient.model';

export interface Collection {
  id: number;
  name: string;
}

export interface CollectionWithFoods {
  collection: Collection;
  foods: IngredientWithQuantity[];
}
