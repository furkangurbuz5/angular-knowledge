import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CollectionResponse, CollectionWithFoodsResponse } from '../dto/collection-response.dto';
import {
  AddFoodToCollectionRequest,
  CreateCollectionRequest,
  DeleteFoodFromCollectionRequest,
} from '../dto/collection-request.dto';

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

  getCollectionById(id: number) {
    return this.httpClient.get<CollectionResponse>(
      `http://localhost:8080/api/v1/collections/${id}`,
    );
  }

  getFoodsByCollectionId(id: number) {
    return this.httpClient.get<CollectionWithFoodsResponse>(
      `http://localhost:8080/api/v1/collections/${id}/foods`,
    );
  }

  deleteCollectionById(id: number) {
    return this.httpClient.delete<void>(
      `http://localhost:8080/api/v1/collections/${id}`,
    );
  }

  addFoodToCollection(id: number, request: AddFoodToCollectionRequest) {
    return this.httpClient.post<CollectionResponse>(
      `http://localhost:8080/api/v1/collections/${id}/foods`,
      request,
    );
  }

  deleteFoodFromCollection(id: number, request: DeleteFoodFromCollectionRequest) {
    return this.httpClient.delete<CollectionResponse>(
      `http://localhost:8080/api/v1/collections/${id}/foods`,
      { body: request },
    );
  }
}
