import { Component, input } from '@angular/core';
import { Ingredient } from '../../../../model/ingredient.model';

@Component({
  selector: 'app-food-card',
  imports: [],
  templateUrl: './food-card.html',
  styleUrl: './food-card.css',
})
export class FoodCard {
  food = input.required<Ingredient>();
  showId = input<boolean>(true);
  showName = input<boolean>(true);
}
