import { inject, Injectable } from '@angular/core';
import { MealClient } from '../client/meal-client';
import { map, Observable, tap } from 'rxjs';
import { Meal } from '../model/meal.model';
import { mapMealResponseToMeal } from '../dto/meal-response.dto';

@Injectable({
  providedIn: 'root',
})
export class MealService {
  private readonly mealClient: MealClient = inject(MealClient);

  addMeal(): Observable<Meal> {
    return this.mealClient.addMeal().pipe(
      tap((meal) => {
        console.log('addMeal(): ', meal);
      }),
    );
  }

  getMeals(): Observable<Meal[]> {
    return this.mealClient.getMeals().pipe(
      tap((meals) => {
        console.log('getMeals(): ', meals);
      }),
    );
  }

  getMealById(mealId: number): Observable<Meal> {
    return this.mealClient.getMealById(mealId).pipe(
      tap((meal) => {
        console.log('getMealById: ', meal);
      }),
    );
  }

  deleteMealById(mealId: number): Observable<void> {
    return this.mealClient.deleteMealById(mealId).pipe(
      tap(() => {
        console.log('deleteMealById: ', mealId);
      }),
    );
  }
}
