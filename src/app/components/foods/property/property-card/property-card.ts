import { Component, input } from '@angular/core';
import { Property } from '../../../../model/properties.model';
import { mapUnitIdToOption } from '../../../../dto/properties-request.dto';

@Component({
  selector: 'app-property-card',
  imports: [],
  templateUrl: './property-card.html',
  styleUrl: './property-card.css',
})
export class PropertyCard {
  property = input.required<Property>();
  protected readonly mapUnitIdToOption = mapUnitIdToOption;
}
