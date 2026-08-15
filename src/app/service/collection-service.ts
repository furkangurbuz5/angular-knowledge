import { inject, Injectable } from '@angular/core';
import { CollectionClient } from '../client/collection-client';
import { map, Observable } from 'rxjs';
import { mapCollectionResponseToCollection } from '../dto/collection-response.dto';
import { AddFoodToCollectionRequest, CreateCollectionRequest } from '../dto/collection-request.dto';
import { mapIngredientResponseToIngredient } from '../dto/ingredients-response.dto';
import { Collection } from '../model/collection.model';
import { Ingredient } from '../model/ingredient.model';

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

  getFoodsByCollectionId(id: number): Observable<Ingredient[]> {
    return this.collectionClient.getFoodsByCollectionId(id).pipe(
      map((ingredientResponse) => {
        return ingredientResponse.map(mapIngredientResponseToIngredient);
      }),
    );
  }

  deleteCollectionById(id: number): Observable<Collection> {
    return this.collectionClient
      .deleteCollectionById(id)
      .pipe(map((collection) => mapCollectionResponseToCollection(collection)));
  }

  addFoodToCollection(id: number, request: AddFoodToCollectionRequest){
    return this.collectionClient.addFoodToCollection(id, request);
  }
}
