import { inject, Injectable } from '@angular/core';
import { MealClient } from '../client/meal-client';
import { map, Observable } from 'rxjs';
import { Meal } from '../model/meal.model';
import { mapMealResponseToMeal } from '../dto/meal-response.dto';

@Injectable({
  providedIn: 'root',
})
export class MealService {
  private readonly mealClient: MealClient = inject(MealClient);

  addMeal(): Observable<Meal> {
    return this.mealClient
      .addMeal()
      .pipe(map((mealResponse) => mapMealResponseToMeal(mealResponse)));
  }

  getMeals(): Observable<Meal[]> {
    return this.mealClient
      .getMeals()
      .pipe(map((mealResponse) => mealResponse.map(mapMealResponseToMeal)));
  }

  getMealById(mealId: number): Observable<Meal> {
    return this.mealClient
      .getMealById(mealId)
      .pipe(map((mealResponse) => mapMealResponseToMeal(mealResponse)));
  }

  deleteMealById(mealId: number): Observable<void> {
    return this.mealClient.deleteMealById(mealId);
  }
}
