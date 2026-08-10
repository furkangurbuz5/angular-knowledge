import { Component, input } from '@angular/core';
import { Ingredient } from '../../../../model/ingredient.model';
import { mapUnitIdToOption } from '../../../../util/unit-mapper';

@Component({
  selector: 'app-food-card',
  imports: [],
  templateUrl: './food-card.html',
  styleUrl: './food-card.css',
})
export class FoodCard {
  food = input.required<Ingredient>();
  protected readonly mapUnitIdToOption = mapUnitIdToOption;
}
