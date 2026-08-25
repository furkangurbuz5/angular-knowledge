import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Ingredient, IngredientWithQuantity } from '../../../model/ingredient.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../../../service/food-service';
import { catchError, finalize, forkJoin, take, tap, throwError } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Dish, DishProperties } from '../../../model/dish.model';
import { DishService } from '../../../service/dish-service';
import { AddFoodToDishRequest, DeleteFoodFromDishRequest } from '../../../dto/dish-request.dto';
import { FoodCard } from '../../foods/food-list/food-card/food-card';
import { CollectionStats } from './collection-stats/collection-stats';
import { CollectionFoodCard } from './collection-food-card/collection-food-card';

@Component({
  selector: 'app-dish-detail',
  imports: [FormsModule, ReactiveFormsModule, FoodCard, CollectionStats, CollectionFoodCard],
  templateUrl: './dish-detail.html',
  styleUrl: './dish-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DishDetail {
  dishId = signal(0);
  dish = signal<Dish>({ id: 0, name: '' });
  isLoading = signal(true);
  hasError = signal(false);
  errorMessage = signal<string>('');
  deleted = signal<boolean>(false);
  dishFoods = signal<IngredientWithQuantity[]>([]);
  dishProperties = signal<DishProperties[]>([]);
  foods = signal<Ingredient[]>([]);
  selectedFood = signal<Ingredient>({ id: 0, name: '', servingSize: 0, unit: '' });

  foodId: number = 0;
  quantity: number = 0;

  protected router: Router = inject(Router);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly foodService: FoodService = inject(FoodService);
  private readonly dishService: DishService = inject(DishService);

  ngOnInit() {
    this.dishId.set(+this.route.snapshot.paramMap.get('id')!);
    if (this.dishId()) {
      this.loadDishAndFoods();
    }
  }

  protected onBack(): void {
    this.router.navigate(['/dishes']).then(() => console.log('navigating to /dishes'));
  }

  protected onFoodDelete(food: IngredientWithQuantity): void {
    const foodToDelete: DeleteFoodFromDishRequest = {
      ingredient_id: food.id,
    };
    this.dishService
      .deleteFoodFromDish(this.dishId(), foodToDelete)
      .pipe(
        finalize(() => {
          this.loadDishAndFoods();
        }),
      )
      .subscribe();
  }

  protected onDelete(): void {
    this.dishService
      .deleteDishById(this.dish().id)
      .pipe(
        take(1),
        finalize(() => {
          this.deleted.set(true);
          this.onBack();
        }),
      )
      .subscribe();
  }

  protected addFoodToDish() {
    if (!this.foodId || !this.quantity) {
      return;
    }
    const addFoodToDishRequest: AddFoodToDishRequest = {
      ingredient_id: this.foodId,
      quantity: this.quantity,
    };

    this.dishService
      .addFoodToDish(this.dishId(), addFoodToDishRequest)
      .pipe(
        take(1),
        catchError(() => {
          return throwError(() => new Error("Couldn't add food to the dish."));
        }),
        finalize(() => {
          this.updateDishWithFoods();
          this.foodId = 0;
          this.quantity = 0;
          this.selectedFood.set({
            id: 0,
            name: '',
            servingSize: 0,
            unit: '',
          });
        }),
      )
      .subscribe({
        error: (err: Error) => {
          this.hasError.set(true);
          this.errorMessage.set(err.message);
        },
      });
  }

  protected getSelectedFood() {
    if (!this.foodId) {
      return;
    }
    this.foodService
      .getFoodById(this.foodId)
      .pipe(
        tap((food) => {
          this.selectedFood.set(food);
        }),
      )
      .subscribe((food) => {
        console.log(food);
      });
  }

  private loadDishAndFoods() {
    forkJoin({
      dishWithFoods: this.dishService.getFoodsByDishId(this.dishId()),
      foods: this.foodService.getAllFoods(),
    })
      .pipe(
        take(1),
        tap(({ dishWithFoods }) => {
          if (!dishWithFoods.dish) {
            throw Error('No dish found!');
          }
        }),
        finalize(() => {
          this.isLoading.set(false);
        }),
      )
      .subscribe({
        next: ({ dishWithFoods, foods }) => {
          this.dish.set(dishWithFoods.dish);
          this.dishFoods.set(dishWithFoods.foods);
          this.dishProperties.set(dishWithFoods.dishProperties);
          this.foods.set(foods);
        },
        error: (error: Error) => {
          this.hasError.set(true);
          this.errorMessage.set(error.message);
        },
      });
  }

  private updateDishWithFoods() {
    this.dishService
      .getFoodsByDishId(this.dishId())
      .pipe(take(1))
      .subscribe((dishWithFoods) => {
        this.dishFoods.set(dishWithFoods.foods);
        this.dishProperties.set(dishWithFoods.dishProperties);
      });
  }
}
