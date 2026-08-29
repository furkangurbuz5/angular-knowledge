export interface Property {
  id: number;
  name: string;
  unit: string;
}

export interface PropertySummary {
  propertyId: number;
  value: number;
  name: string;
  unitId: number;
}

export interface PropertyWithValue {
  id: number;
  name: string;
  unit: string;
  value: number;
}
