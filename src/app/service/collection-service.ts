import { inject, Injectable } from '@angular/core';
import { CollectionClient } from '../client/collection-client';
import { map } from 'rxjs';
import { mapCollectionResponseToCollection } from '../dto/collection-response.dto';
import { CreateCollectionRequest } from '../dto/collection-request.dto';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  private readonly collectionClient: CollectionClient = inject(CollectionClient);

  getAllCollections() {
    return this.collectionClient
      .getAllCollections()
      .pipe(map((collections) => collections.map(mapCollectionResponseToCollection)));
  }

  addCollection(collection: CreateCollectionRequest) {
    return this.collectionClient
      .addCollection(collection)
      .pipe(map((collection) => mapCollectionResponseToCollection(collection)));
  }
}
