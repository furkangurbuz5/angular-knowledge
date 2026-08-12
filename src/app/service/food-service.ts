import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { FoodClient } from '../client/food-client';
import {
  AddPropertyToIngredientRequest,
  CreateIngredientRequest,
} from '../dto/ingredients-request.dto';
import {
  mapIngredientPropertiesResponseToIngredientProperties,
  mapIngredientResponseToIngredient,
} from '../dto/ingredients-response.dto';
import { Ingredient, IngredientProperties } from '../model/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private readonly foodClient = inject(FoodClient);

  getAllFoods() {
    return this.foodClient.getAllFoods().pipe(
      map((propertyResponse): Ingredient[] => {
        return propertyResponse.map(mapIngredientResponseToIngredient);
      }),
    );
  }

  addFood(food: CreateIngredientRequest) {
    return this.foodClient.addFood(food).pipe(
      map((ingredientResponse): Ingredient => {
        return mapIngredientResponseToIngredient(ingredientResponse);
      }),
    );
  }

  addPropertyToFood(property: AddPropertyToIngredientRequest) {
    return this.foodClient.addPropertyToFood(property).pipe(
      map((ingredientResponse): IngredientProperties => {
        return mapIngredientPropertiesResponseToIngredientProperties(ingredientResponse);
      }),
    );
  }

  getFoodById(id: number) {
    return this.foodClient.getFoodById(id).pipe(
      map((ingredientResponse): Ingredient => {
        return mapIngredientResponseToIngredient(ingredientResponse);
      }),
    );
  }

  deleteFoodById(id: number) {
    return this.foodClient.deleteFoodById(id).pipe(
      map((ingredientResponse): Ingredient => {
        return mapIngredientResponseToIngredient(ingredientResponse);
      }),
    );
  }
}
