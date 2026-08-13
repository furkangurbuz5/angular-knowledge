import { Component, input } from '@angular/core';
import { IngredientWithProperties } from '../../../../model/ingredient.model';
import { FoodCard } from '../../../foods/food-list/food-card/food-card';

@Component({
  selector: 'app-person-food-detail',
  imports: [FoodCard],
  templateUrl: './person-food-detail.html',
  styleUrl: './person-food-detail.css',
})
export class PersonFoodDetail {
  readonly foods = input.required<IngredientWithProperties[]>();

  ngOnInit() {
    console.log(this.foods());
  }
}
