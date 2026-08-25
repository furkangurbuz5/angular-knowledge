import { inject, Injectable } from '@angular/core';
import { DishClient } from '../client/dish-client';
import { map, Observable } from 'rxjs';
import { mapDishPropertyResponseToDish, mapDishResponseToDish } from '../dto/dish-response.dto';
import {
  AddFoodToDishRequest,
  CreateDishRequest,
  DeleteFoodFromDishRequest,
} from '../dto/dish-request.dto';
import { mapIngredientWithQuantityResponseToIngredient } from '../dto/ingredients-response.dto';
import { Dish, DishWithFoods } from '../model/dish.model';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  private readonly dishClient: DishClient = inject(DishClient);

  getAllDishes(): Observable<Dish[]> {
    return this.dishClient.getAllDishes().pipe(map((dishes) => dishes.map(mapDishResponseToDish)));
  }

  addDish(dish: CreateDishRequest): Observable<Dish> {
    return this.dishClient.addDish(dish).pipe(map((dish) => mapDishResponseToDish(dish)));
  }

  getDishById(id: number): Observable<Dish> {
    return this.dishClient
      .getDishById(id)
      .pipe(map((dishResponse) => mapDishResponseToDish(dishResponse)));
  }

  getFoodsByDishId(id: number): Observable<DishWithFoods> {
    return this.dishClient.getFoodsByDishId(id).pipe(
      map((dishWithFoodsResponse): DishWithFoods => {
        return {
          dish: mapDishResponseToDish(dishWithFoodsResponse.dish),
          foods: dishWithFoodsResponse.ingredients.map((food) =>
            mapIngredientWithQuantityResponseToIngredient(food),
          ),
          dishProperties: dishWithFoodsResponse.dishProperties.map((property) =>
            mapDishPropertyResponseToDish(property),
          ),
        };
      }),
    );
  }

  getAllDishesWithFoods(): Observable<DishWithFoods[]> {
    return this.dishClient.getAllDishesWithFoods().pipe(
      map((dishWithFoodsResponse): DishWithFoods[] => {
        return dishWithFoodsResponse.map((response) => {
          return {
            dish: mapDishResponseToDish(response.dish),
            foods: response.ingredients.map((food) =>
              mapIngredientWithQuantityResponseToIngredient(food),
            ),
            dishProperties: response.dishProperties.map((property) =>
              mapDishPropertyResponseToDish(property),
            ),
          };
        });
      }),
    );
  }

  deleteDishById(id: number): Observable<void> {
    return this.dishClient.deleteDishById(id);
  }

  addFoodToDish(id: number, request: AddFoodToDishRequest) {
    return this.dishClient.addFoodToDish(id, request);
  }

  deleteFoodFromDish(id: number, request: DeleteFoodFromDishRequest) {
    return this.dishClient.deleteFoodFromDish(id, request);
  }
}
