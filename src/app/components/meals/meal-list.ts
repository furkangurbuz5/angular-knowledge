import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Meal } from '../../model/meal.model';
import { finalize, tap } from 'rxjs';
import { RouterLink } from '@angular/router';
import { formatMealTime } from '../../util/format-time';
import { MealClient } from '../../client/meal-client';

@Component({
  selector: 'app-meal-list',
  imports: [RouterLink],
  templateUrl: './meal-list.html',
  styleUrl: './meal-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealList implements OnInit {
  private readonly mealClient: MealClient = inject(MealClient);
  protected readonly meals = signal<Meal[]>([]);

  ngOnInit(): void {
    this.fetchMeals();
  }

  private fetchMeals(): void {
    console.log('Fetching meals...');
    this.mealClient
      .getMeals()
      .pipe(tap((meals) => this.meals.set(meals)))
      .subscribe();
  }

  protected onDelete(mealId: number) {
    console.log('Deleting meal with id: ', mealId);
    this.mealClient
      .deleteMealById(mealId)
      .pipe(
        finalize(() => {
          this.fetchMeals();
        }),
      )
      .subscribe();
  }

  protected onAddMeal() {
    console.log('Adding meal..');
    this.mealClient
      .addMeal()
      .pipe(
        finalize(() => {
          this.fetchMeals();
        }),
      )
      .subscribe();
  }

  protected getMealTime(meal: Meal): string {
    return formatMealTime(meal.timestamp, meal.tzOffsetMin);
  }
}
