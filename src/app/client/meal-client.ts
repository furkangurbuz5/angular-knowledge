import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Meal } from '../model/meal.model';
import { MealDish } from '../model/dish.model';
import {
  AddDishToMealRequest,
  AddIngredientToMealDishRequest,
  ModifyIngredientInMealDishRequest,
} from '../dto/meal-request.dto';
import { MealDishIngredient } from '../model/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class MealClient {
  private readonly httpClient: HttpClient = inject(HttpClient);

  addMeal(): Observable<Meal> {
    return this.httpClient.post<Meal>('http://localhost:8080/api/v1/meals', {});
  }

  addDishToMeal(mealId: number, request: AddDishToMealRequest): Observable<MealDish> {
    return this.httpClient.post<MealDish>(`http://localhost:8080/api/v1/meals/${mealId}`, {
      dishId: request.dishId,
    });
  }

  deleteDishFromMeal(mealDishId: number): Observable<void> {
    return this.httpClient.delete<void>(`http://localhost:8080/api/v1/meals/dish/${mealDishId}`);
  }

  getMeals(): Observable<Meal[]> {
    return this.httpClient.get<Meal[]>('http://localhost:8080/api/v1/meals');
  }

  getMealById(mealId: number): Observable<Meal> {
    return this.httpClient.get<Meal>(`http://localhost:8080/api/v1/meals/${mealId}`).pipe(
      tap((meal) => {
        console.log(meal);
      }),
    );
  }

  deleteMealById(mealId: number): Observable<void> {
    return this.httpClient.delete<void>(`http://localhost:8080/api/v1/meals/${mealId}`);
  }

  addMealDishIngredient(
    mealDishId: number,
    request: AddIngredientToMealDishRequest,
  ): Observable<MealDishIngredient> {
    return this.httpClient.post<MealDishIngredient>(
      `http://localhost:8080/api/v1/meals/dish/${mealDishId}/ingredient`,
      {
        ingredientId: request.ingredientId,
      },
    );
  }

  modifyMealDishIngredient(
    mealId: number,
    request: ModifyIngredientInMealDishRequest,
  ): Observable<void> {
    return this.httpClient.post<void>(`http://localhost:8080/api/v1/meals/${mealId}`, {
      quantity: request.quantity,
    });
  }

  deleteMealDishIngredient(mealId: number): Observable<MealDish> {
    return this.httpClient.delete<MealDish>(
      `http://localhost:8080/api/v1/meals/dish/ingredient/${mealId}`,
    );
  }

  copyMealDish(fromMealDishId: number, toMealDishId: number): Observable<MealDishIngredient> {
    const params = new HttpParams()
      .set('fromMealDishId', fromMealDishId)
      .set('toMealDishId', toMealDishId);

    return this.httpClient.post<MealDishIngredient>(
      `http://localhost:8080/api/v1/meals/dish`,
      {},
      { params: params },
    );
  }
}
