import { Component, input, InputSignal, output } from '@angular/core';
import { MealDish } from '../../../model/dish.model';
import { Ingredient } from '../../../model/ingredient.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { mapUnitIdToOption } from '../../../util/unit-mapper';

@Component({
  selector: 'app-meal-dish-table',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './meal-dish-table.html',
  styleUrl: './meal-dish-table.css',
})
export class MealDishTable {
  mealDish: InputSignal<MealDish> = input.required<MealDish>();
  foods: InputSignal<Ingredient[]> = input.required<Ingredient[]>();
  update = output<{ mealDishId: number; foodId: number; event: Event }>();
  delete = output<{ mealDishId: number; foodId: number }>();
  add = output<{ mealDishId: number; foodId: number }>();

  protected ingredientId: number = 0;
  protected readonly mapUnitIdToOption = mapUnitIdToOption;

  protected updateIngredient(dishId: number, foodId: number, event: Event) {
    this.update.emit({
      mealDishId: dishId,
      foodId: foodId,
      event: event,
    });
  }

  protected deleteIngredient(dishId: number, foodId: number) {
    this.delete.emit({
      mealDishId: dishId,
      foodId,
    });
  }

  protected addIngredient(dishId: number, foodId: number) {
    this.add.emit({
      mealDishId: dishId,
      foodId,
    });
    this.ingredientId = 0;
  }
}
