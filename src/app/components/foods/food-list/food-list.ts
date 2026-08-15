import { Component, inject, signal } from '@angular/core';
import { FoodService } from '../../../service/food-service';
import { Ingredient } from '../../../model/ingredient.model';
import { finalize, take, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { mapOptionToUnitId, UnitOption } from '../../../util/unit-mapper';
import { CreateIngredientRequest } from '../../../dto/ingredients-request.dto';

@Component({
  selector: 'app-food-person-list',
  imports: [FormsModule, RouterLink],
  templateUrl: './food-list.html',
  styleUrl: './food-list.css',
})
export class FoodList {
  protected readonly foods = signal<Ingredient[]>([]);
  protected food = '';
  protected servingSize: number | null = null;
  protected unit = '';
  private readonly foodService = inject(FoodService);

  ngOnInit() {
    this.fetchFoods();
  }

  protected addFood() {
    if (!this.food || !this.servingSize || !this.unit) {
      return;
    }

    const foodToAdd: CreateIngredientRequest = {
      name: this.food,
      serving_size: this.servingSize,
      unit_id: mapOptionToUnitId(this.unit as UnitOption),
    };

    this.foodService
      .addFood(foodToAdd)
      .pipe(
        take(1),
        finalize(() => {
          this.fetchFoods();
          this.food = '';
          this.servingSize = null;
          this.unit = '';
        }),
      )
      .subscribe();
  }

  private fetchFoods() {
    this.foodService
      .getAllFoods()
      .pipe(
        take(1),
        tap((foods) => {
          this.foods.set(foods);
        }),
      )
      .subscribe();
  }
}
