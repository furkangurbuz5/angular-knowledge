import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize, forkJoin, take, throwError } from 'rxjs';
import { Ingredient } from '../../../../model/ingredient.model';
import { FoodService } from '../../../../service/food-service';
import { Action } from '../../../shared/action/action';
import { FoodCard } from '../food-card/food-card';
import { Property, PropertyWithValue } from '../../../../model/properties.model';
import { PropertyService } from '../../../../service/property-service';
import { FoodPropertyCard } from '../food-property-card/food-property-card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddPropertyToIngredientRequest } from '../../../../dto/ingredients-request.dto';

@Component({
  selector: 'app-food-detail',
  imports: [Action, FoodCard, FoodPropertyCard, FormsModule, ReactiveFormsModule],
  templateUrl: './food-detail.html',
  styleUrl: './food-detail.css',
})
export class FoodDetail {
  ingredientId = signal(0);
  food = signal<Ingredient | null>(null);
  isLoading = signal(true);
  hasError = signal(false);
  errorMessage = signal<string>('');
  deleted = signal<boolean>(false);
  foodProperties = signal<PropertyWithValue[]>([]);
  properties = signal<Property[]>([]);

  propertyId: number = 0;
  propertyValue: number = 0;
  protected router: Router = inject(Router);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly foodService: FoodService = inject(FoodService);
  private readonly propertyService: PropertyService = inject(PropertyService);

  ngOnInit() {
    this.ingredientId.set(+this.route.snapshot.paramMap.get('id')!);
    if (this.ingredientId()) {
      this.loadFoodAndProperties();
    }
  }

  protected onBack(): void {
    this.router.navigate(['/foods']).then(() => console.log('navigating to /foods'));
  }

  protected onDelete(food: Ingredient): void {
    this.foodService
      .deleteFoodById(food.id)
      .pipe(
        take(1),
        finalize(() => {
          this.deleted.set(true);
          this.onBack();
        }),
      )
      .subscribe();
  }

  protected addPropertyToFood() {
    const propertyToAdd: AddPropertyToIngredientRequest = {
      ingredient_id: this.ingredientId(),
      property_id: this.propertyId,
      value: this.propertyValue,
    };

    this.foodService
      .addPropertyToFood(propertyToAdd)
      .pipe(
        take(1),
        catchError(() => {
          return throwError(() => new Error("Couldn't add property to the food."));
        }),
        finalize(() => {
          this.updateProperties();
        }),
      )
      .subscribe({
        error: (err: Error) => {
          this.hasError.set(true);
          this.errorMessage.set(err.message);
        }
      });
  }

  private loadFoodAndProperties() {
    forkJoin({
      food: this.foodService.getFoodById(this.ingredientId()),
      foodProperties: this.propertyService.getPropertyWithValueByIngredientId(this.ingredientId()),
      properties: this.propertyService.getAllProperties(),
    })
      .pipe(
        take(1),
        finalize(() => {
          this.isLoading.set(false);
        }),
      )
      .subscribe({
        next: ({ food, foodProperties, properties }) => {
          this.food.set(food);
          this.foodProperties.set(foodProperties);
          this.properties.set(properties);
        },
        error: () => {
          this.hasError.set(true);
          this.errorMessage.set('Failed to load food details.');
        },
      });
  }

  private updateProperties() {
    this.propertyService
      .getPropertyWithValueByIngredientId(this.ingredientId())
      .pipe(take(1))
      .subscribe((properties) => {
        this.foodProperties.set(properties);
      });
  }
}
