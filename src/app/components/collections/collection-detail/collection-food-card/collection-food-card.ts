import { Component, input, output } from '@angular/core';
import { IngredientWithQuantity } from '../../../../model/ingredient.model';

@Component({
  selector: 'app-collection-food-card',
  imports: [],
  templateUrl: './collection-food-card.html',
  styleUrl: './collection-food-card.css',
})
export class CollectionFoodCard {
  food = input.required<IngredientWithQuantity>();
  delete = output<IngredientWithQuantity>();

  protected onDelete(): void {
    console.log(this.food());
    this.delete.emit(this.food());
  }
}
