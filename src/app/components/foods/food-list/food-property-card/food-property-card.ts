import { Component, input } from '@angular/core';
import { PropertyWithValue } from '../../../../model/properties.model';

@Component({
  selector: 'app-food-property-card',
  imports: [],
  templateUrl: './food-property-card.html',
  styleUrl: './food-property-card.css',
})
export class FoodPropertyCard {
  property = input.required<PropertyWithValue>();
}
