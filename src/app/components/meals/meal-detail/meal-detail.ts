import { Component, inject, input, signal, WritableSignal } from '@angular/core';
import { Meal } from '../../../model/meal.model';
import { MealService } from '../../../service/meal-service';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize, tap } from 'rxjs';
import { DishService } from '../../../service/dish-service';
import { Dish, DishWithFoods } from '../../../model/dish.model';
import { FormsModule } from '@angular/forms';
import { formatMealTime } from '../../../util/format-time';
import {
  AddFoodToDishRequest,
  DeleteFoodFromDishRequest,
  UpdateFoodRequest,
} from '../../../dto/dish-request.dto';
import { Ingredient } from '../../../model/ingredient.model';
import { FoodService } from '../../../service/food-service';
import { MealTable } from '../meal-table/meal-table';

@Component({
  selector: 'app-meal-detail',
  imports: [FormsModule, MealTable],
  templateUrl: './meal-detail.html',
  styleUrl: './meal-detail.css',
})
export class MealDetail {
  private readonly mealService: MealService = inject(MealService);
  private readonly dishService: DishService = inject(DishService);
  private readonly foodService: FoodService = inject(FoodService);
  private readonly router: Router = inject(Router);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  protected readonly mealId: WritableSignal<number> = signal<number>(0);
  protected readonly meal: WritableSignal<Meal> = signal<Meal>({
    id: 0,
    timestamp: 0,
    tzOffsetMin: 0,
    dishes: [],
    summaryComplete: false,
    summary: []
  });
  protected readonly dishes: WritableSignal<Dish[]> = signal([]);
  protected dishId: number = 0;
  protected dishWithFoods: WritableSignal<DishWithFoods> = signal({
    dish: {
      id: 0,
      name: '',
    },
    foods: [],
    dishProperties: [],
  });
  protected foods = signal<Ingredient[]>([]);
  protected foodId: number = 0;

  protected readonly mealDishes: WritableSignal<DishWithFoods[]> = signal([]);

  protected readonly isLoading: WritableSignal<boolean> = signal<boolean>(true);

  ngOnInit() {
    this.getMealId();
    if (this.mealId()) {
      this.fetchMeal(this.mealId());
    }
    this.fetchDishes();
    this.fetchFoods();
  }

  protected getMealTime(meal: Meal): string {
    return formatMealTime(meal.timestamp, meal.tzOffsetMin);
  }

  protected addFoodToDish(dishId: number, foodId: number): void {
    if (foodId === 0) {
      return;
    }

    console.log('adding food');

    const request: AddFoodToDishRequest = {
      ingredient_id: foodId,
      quantity: 0,
    };

    this.dishService
      .addFoodToDish(dishId, request)
      .pipe(
        finalize(() => {
          this.getDish(dishId);
        }),
      )
      .subscribe();
  }

  protected updateFoodInDish(dishId: number, foodId: number, event: Event): void {
    const eventTarget = event.target as HTMLInputElement;
    const quantity = parseInt(eventTarget.value);

    if (!quantity) {
      return;
    }

    const request: UpdateFoodRequest = {
      ingredientId: foodId,
      quantity: quantity,
    };
    this.dishService
      .updateFoodInDish(dishId, request)
      .pipe(
        finalize(() => {
          this.getDish(dishId);
        }),
      )
      .subscribe();
  }

  protected onDeleteFoodFromDish(dishId: number, foodId: number) {
    const request: DeleteFoodFromDishRequest = {
      ingredient_id: foodId,
    };

    this.dishService
      .deleteFoodFromDish(dishId, request)
      .pipe(
        finalize(() => {
          this.getDish(dishId);
        }),
      )
      .subscribe();
  }

  protected onAddDishToMeal() {
    if (!this.dishId) {
      return;
    }
  }

  protected getDish(dishId: number) {
    if (dishId === 0) {
      this.dishWithFoods.set({
        dish: {
          id: 0,
          name: '',
        },
        foods: [],
        dishProperties: [],
      });

      return;
    }
    this.dishService
      .getFoodsByDishId(dishId)
      .pipe(
        tap((dish) => {
          console.log(dish);
          this.dishWithFoods.set(dish);
        }),
      )
      .subscribe();
  }

  protected onDeleteMeal(mealId: number) {
    this.mealService
      .deleteMealById(mealId)
      .pipe(
        finalize(() => {
          this.router.navigate(['/meals']).then(() => console.log('navigating to /meals'));
        }),
      )
      .subscribe();
  }

  private fetchFoods() {
    this.foodService
      .getAllFoods()
      .pipe(
        tap((foods) => {
          if (!foods) {
            throw Error('No foods found!');
          }
          this.foods.set(foods);
        }),
        finalize(() => {
          this.isLoading.set(false);
        }),
      )
      .subscribe();
  }

  private getMealId() {
    this.mealId.set(+this.route.snapshot.paramMap.get('id')!);
  }

  private fetchMeal(mealId: number): void {
    this.mealService
      .getMealById(mealId)
      .pipe(
        tap((meal) => {
          this.meal.set(meal);
        }),
        finalize(() => {
          this.isLoading.set(false);
        }),
      )
      .subscribe();
  }

  private fetchDishes() {
    return this.dishService
      .getAllDishes()
      .pipe(tap((dishes) => this.dishes.set(dishes)))
      .subscribe();
  }
}
