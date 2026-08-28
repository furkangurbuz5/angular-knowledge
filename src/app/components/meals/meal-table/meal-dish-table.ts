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
  update = output<{ dishId: number; foodId: number; event: Event }>();
  delete = output<{ dishId: number; foodId: number }>();
  add = output<{ dishId: number; foodId: number }>();

  protected dishId: number = 0;
  protected foodId: number = 0;

  protected updateFoodInDish(dishId: number, foodId: number, event: Event) {
    this.update.emit({
      dishId: dishId,
      foodId: foodId,
      event: event,
    });
  }

  protected onDeleteFoodFromDish(dishId: number, foodId: number) {
    this.delete.emit({
      dishId,
      foodId,
    });
  }

  protected addFoodToDish(dishId: number, foodId: number) {
    this.add.emit({
      dishId,
      foodId,
    });
  }

  protected readonly mapUnitIdToOption = mapUnitIdToOption;
}
