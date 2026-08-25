import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MealResponse } from '../dto/meal-response.dto';

@Injectable({
  providedIn: 'root',
})
export class MealClient {
  private readonly httpClient: HttpClient = inject(HttpClient);

  addMeal(): Observable<MealResponse> {
    return this.httpClient.post<MealResponse>('http://localhost:8080/api/v1/meals', {});
  }

  getMeals(): Observable<MealResponse[]> {
    return this.httpClient.get<MealResponse[]>('http://localhost:8080/api/v1/meals');
  }

  getMealById(mealId: number): Observable<MealResponse> {
    return this.httpClient.get<MealResponse>(`http://localhost:8080/api/v1/meals/${mealId}`);
  }

  deleteMealById(mealId: number): Observable<void> {
    return this.httpClient.delete<void>(`http://localhost:8080/api/v1/meals/${mealId}`);
  }
}
