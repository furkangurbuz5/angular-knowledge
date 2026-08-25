import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { MealService } from '../../service/meal-service';
import { Meal } from '../../model/meal.model';
import { finalize, tap } from 'rxjs';
import { RouterLink } from '@angular/router';
import { formatMealTime } from '../../util/format-time';

@Component({
  selector: 'app-meal-list',
  imports: [RouterLink],
  templateUrl: './meal-list.html',
  styleUrl: './meal-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealList implements OnInit {
  private readonly mealService: MealService = inject(MealService);
  protected readonly meals = signal<Meal[]>([]);

  ngOnInit(): void {
    this.fetchMeals();
  }

  private fetchMeals(): void {
    console.log('Fetching meals...');
    this.mealService
      .getMeals()
      .pipe(tap((meals) => this.meals.set(meals)))
      .subscribe();
  }

  protected onDelete(mealId: number) {
    console.log('Deleting meal with id: ', mealId);
    this.mealService
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
    this.mealService
      .addMeal()
      .pipe(
        finalize(() => {
          this.fetchMeals();
        }),
      )
      .subscribe();
  }

  protected getMealTime(meal: Meal): string {
    return formatMealTime(meal.timestamp, meal.tzOffsetTime);
  }
}
