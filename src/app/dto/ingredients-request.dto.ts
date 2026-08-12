export interface CreateIngredientRequest {
  name: string;
  serving_size: number;
  unit_id: number;
}

export interface AddPropertyToIngredientRequest {
  ingredient_id: number;
  property_id: number;
  value: number;
}
