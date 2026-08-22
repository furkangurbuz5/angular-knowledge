import { IngredientWithQuantity } from './ingredient.model';

export interface Collection {
  id: number;
  name: string;
}

export interface CollectionWithFoods {
  collection: Collection;
  foods: IngredientWithQuantity[];
  collectionProperties: CollectionProperties[];
}

export interface CollectionProperties {
  propertyId: number;
  propertyName: string;
  unit: string;
  propertyAmount: number;
}
