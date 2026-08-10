import { Property } from '../model/properties.model';

export interface PropertyResponse {
  id: number;
  name: string;
  unit: string;
}

export function mapPropertyResponseToProperty(propertyResponse: PropertyResponse): Property {
  return {
    id: propertyResponse.id,
    name: propertyResponse.name,
    unit: propertyResponse.unit,
  };
}
