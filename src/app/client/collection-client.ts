import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CollectionResponse } from '../dto/collection-response.dto';
import { CreateCollectionRequest } from '../dto/collection-request.dto';

@Injectable({
  providedIn: 'root',
})
export class CollectionClient {
  private readonly httpClient: HttpClient = inject(HttpClient);

  getAllCollections() {
    return this.httpClient.get<CollectionResponse[]>('http://localhost:8080/api/v1/collections');
  }

  addCollection(collection: CreateCollectionRequest) {
    return this.httpClient.post<CollectionResponse>(
      'http://localhost:8080/api/v1/collections',
      collection,
    );
  }
}
