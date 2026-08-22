import { IngredientWithQuantityResponse } from './ingredients-response.dto';
import { Collection } from '../model/collection.model';

export interface CollectionResponse {
  id: number;
  name: string;
}

export function mapCollectionResponseToCollection(response: CollectionResponse): Collection {
  return {
    id: response.id,
    name: response.name,
  };
}

export interface CollectionWithFoodsResponse {
  collection: CollectionResponse;
  ingredients: IngredientWithQuantityResponse[];
  collectionProperties: CollectionPropertiesResponse[];
}

export interface CollectionPropertiesResponse {
  propertyId: number;
  propertyName: string;
  unit: string;
  propertyAmount: number;
}

export function mapCollectionPropertyResponseToCollection(
  response: CollectionPropertiesResponse,
): CollectionPropertiesResponse {
  return {
    propertyId: response.propertyId,
    propertyName: response.propertyName,
    unit: response.unit,
    propertyAmount: response.propertyAmount,
  };
}
