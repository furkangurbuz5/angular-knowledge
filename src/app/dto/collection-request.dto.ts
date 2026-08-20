export interface CreateCollectionRequest {
  name: string;
}

export interface AddFoodToCollectionRequest{
  ingredient_id: number;
  quantity: number;
}

export interface DeleteFoodFromCollectionRequest{
  ingredient_id: number;
}
