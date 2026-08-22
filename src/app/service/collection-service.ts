import { inject, Injectable } from '@angular/core';
import { CollectionClient } from '../client/collection-client';
import { map, Observable } from 'rxjs';
import {
  mapCollectionPropertyResponseToCollection,
  mapCollectionResponseToCollection,
} from '../dto/collection-response.dto';
import {
  AddFoodToCollectionRequest,
  CreateCollectionRequest,
  DeleteFoodFromCollectionRequest,
} from '../dto/collection-request.dto';
import { mapIngredientWithQuantityResponseToIngredient } from '../dto/ingredients-response.dto';
import { Collection, CollectionWithFoods } from '../model/collection.model';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  private readonly collectionClient: CollectionClient = inject(CollectionClient);

  getAllCollections(): Observable<Collection[]> {
    return this.collectionClient
      .getAllCollections()
      .pipe(map((collections) => collections.map(mapCollectionResponseToCollection)));
  }

  addCollection(collection: CreateCollectionRequest): Observable<Collection> {
    return this.collectionClient
      .addCollection(collection)
      .pipe(map((collection) => mapCollectionResponseToCollection(collection)));
  }

  getCollectionById(id: number): Observable<Collection> {
    return this.collectionClient
      .getCollectionById(id)
      .pipe(map((collection) => mapCollectionResponseToCollection(collection)));
  }

  getFoodsByCollectionId(id: number): Observable<CollectionWithFoods> {
    return this.collectionClient.getFoodsByCollectionId(id).pipe(
      map((collectionWithFoodsResponse): CollectionWithFoods => {
        return {
          collection: mapCollectionResponseToCollection(collectionWithFoodsResponse.collection),
          foods: collectionWithFoodsResponse.ingredients.map((food) =>
            mapIngredientWithQuantityResponseToIngredient(food),
          ),
          collectionProperties: collectionWithFoodsResponse.collectionProperties.map((property) =>
            mapCollectionPropertyResponseToCollection(property),
          ),
        };
      }),
    );
  }

  deleteCollectionById(id: number): Observable<void> {
    return this.collectionClient.deleteCollectionById(id);
  }

  addFoodToCollection(id: number, request: AddFoodToCollectionRequest) {
    return this.collectionClient.addFoodToCollection(id, request);
  }

  deleteFoodFromCollection(id: number, request: DeleteFoodFromCollectionRequest) {
    return this.collectionClient.deleteFoodFromCollection(id, request);
  }
}
