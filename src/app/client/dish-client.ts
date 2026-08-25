import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DishResponse, DishWithFoodsResponse } from '../dto/dish-response.dto';
import {
  AddFoodToDishRequest,
  CreateDishRequest,
  DeleteFoodFromDishRequest,
} from '../dto/dish-request.dto';

@Injectable({
  providedIn: 'root',
})
export class DishClient {
  private readonly httpClient: HttpClient = inject(HttpClient);

  getAllDishes() {
    return this.httpClient.get<DishResponse[]>('http://localhost:8080/api/v1/dishes');
  }

  addDish(dish: CreateDishRequest) {
    return this.httpClient.post<DishResponse>('http://localhost:8080/api/v1/dishes', dish);
  }

  getDishById(id: number) {
    return this.httpClient.get<DishResponse>(`http://localhost:8080/api/v1/dishes/${id}`);
  }

  getFoodsByDishId(id: number) {
    return this.httpClient.get<DishWithFoodsResponse>(
      `http://localhost:8080/api/v1/dishes/${id}/foods`,
    );
  }

  getAllDishesWithFoods() {
    return this.httpClient.get<DishWithFoodsResponse[]>(
      `http://localhost:8080/api/v1/dishes/foods`,
    );
  }

  deleteDishById(id: number) {
    return this.httpClient.delete<void>(`http://localhost:8080/api/v1/dishes/${id}`);
  }

  addFoodToDish(id: number, request: AddFoodToDishRequest) {
    return this.httpClient.post<DishResponse>(
      `http://localhost:8080/api/v1/dishes/${id}/foods`,
      request,
    );
  }

  deleteFoodFromDish(id: number, request: DeleteFoodFromDishRequest) {
    return this.httpClient.delete<DishResponse>(`http://localhost:8080/api/v1/dishes/${id}/foods`, {
      body: request,
    });
  }
}
