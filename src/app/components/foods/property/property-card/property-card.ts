import { Component, input } from '@angular/core';
import { Property } from '../../../../model/properties.model';

@Component({
  selector: 'app-property-card',
  imports: [],
  templateUrl: './property-card.html',
  styleUrl: './property-card.css',
})
export class PropertyCard {
  property = input.required<Property>();
  showId = input<boolean>(true);
  showName = input<boolean>(true);
}
