import { inject, Injectable } from '@angular/core';
import { PropertyClient } from '../client/property-client';
import { map, tap } from 'rxjs';
import { mapPropertyResponseToProperty, PropertyResponse } from '../dto/properties-response.dto';
import { CreatePropertyRequest } from '../dto/properties-request.dto';
import { Property } from '../model/properties.model';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private readonly propertyClient = inject(PropertyClient);

  getAllProperties() {
    return this.propertyClient.getAllProperties().pipe(
      map((propertyResponse) => {
        return propertyResponse.map(mapPropertyResponseToProperty);
      }),
    );
  }

  addProperty(property: CreatePropertyRequest) {
    return this.propertyClient.addProperty(property).pipe(
      map((propertyResponse): Property => {
        return mapPropertyResponseToProperty(propertyResponse);
      }),
    );
  }

  getPropertyById(id: number) {
    return this.propertyClient.getPropertyById(id).pipe(
      map((propertyResponse): Property => {
        return mapPropertyResponseToProperty(propertyResponse);
      }),
    );
  }

  deletePropertyById(id: number) {
    return this.propertyClient.deletePropertyById(id).pipe(
      map((propertyResponse): Property => {
        return mapPropertyResponseToProperty(propertyResponse);
      }),
    );
  }
}
