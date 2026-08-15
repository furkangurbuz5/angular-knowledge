import { Component, input } from '@angular/core';
import { Ingredient } from '../../../../model/ingredient.model';

@Component({
  selector: 'app-collection-food-card',
  imports: [],
  templateUrl: './collection-food-card.html',
  styleUrl: './collection-food-card.css',
})
export class CollectionFoodCard {
  food = input.required<Ingredient>();
}
