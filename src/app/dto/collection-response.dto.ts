import { IngredientResponse } from './ingredients-response.dto';
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
  foods: IngredientResponse[];
}
