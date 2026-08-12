import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AddPropertyToIngredientRequest,
  CreateIngredientRequest,
} from '../dto/ingredients-request.dto';
import { IngredientPropertiesResponse, IngredientResponse } from '../dto/ingredients-response.dto';

@Injectable({
  providedIn: 'root',
})
export class FoodClient {
  private readonly httpClient = inject(HttpClient);

  getAllFoods() {
    return this.httpClient.get<IngredientResponse[]>('http://localhost:8080/api/v1/ingredients');
  }

  getFoodById(id: number) {
    return this.httpClient.get<IngredientResponse>(
      `http://localhost:8080/api/v1/ingredients/${id}`,
    );
  }

  addFood(food: CreateIngredientRequest) {
    return this.httpClient.post<IngredientResponse>(
      'http://localhost:8080/api/v1/ingredients',
      food,
    );
  }

  addPropertyToFood(propertyToAdd: AddPropertyToIngredientRequest) {
    return this.httpClient.post<IngredientPropertiesResponse>(
      'http://localhost:8080/api/v1/ingredients/property',
      propertyToAdd,
    );
  }

  deleteFoodById(id: number) {
    return this.httpClient.delete<IngredientResponse>(
      `http://localhost:8080/api/v1/ingredients/${id}`,
    );
  }
}
