import { Property, PropertyWithValue } from '../model/properties.model';

export interface PropertyResponse {
  id: number;
  name: string;
  unit: string;
}

export interface PropertyWithValueResponse {
  id: number;
  name: string;
  unit: string;
  value: number;
}

export function mapPropertyResponseToProperty(propertyResponse: PropertyResponse): Property {
  return {
    id: propertyResponse.id,
    name: propertyResponse.name,
    unit: propertyResponse.unit,
  };
}

export function mapPropertyWithValueResponseToPropertyWithValue(
  propertyResponse: PropertyWithValueResponse,
): PropertyWithValue {
  return {
    id: propertyResponse.id,
    name: propertyResponse.name,
    unit: propertyResponse.unit,
    value: propertyResponse.value,
  };
}
