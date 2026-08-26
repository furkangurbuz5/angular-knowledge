import { Component, input, InputSignal, output } from '@angular/core';
import { DishWithFoods } from '../../../model/dish.model';
import { Ingredient } from '../../../model/ingredient.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-meal-table',
  imports: [FormsModule],
  templateUrl: './meal-table.html',
  styleUrl: './meal-table.css',
})
export class MealTable {
  dish: InputSignal<DishWithFoods> = input.required<DishWithFoods>();
  foods: InputSignal<Ingredient[]> = input.required<Ingredient[]>();
  update = output<{ dishId: number; foodId: number, event: Event }>();
  delete = output<{ dishId: number; foodId: number }>();
  add = output<{ dishId: number; foodId: number }>();

  protected dishId: number = 0;
  protected foodId: number = 0;

  protected updateFoodInDish(dishId: number, foodId: number, event: Event) {
    this.update.emit({
      dishId: dishId,
      foodId: foodId,
      event: event
    })
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
}
