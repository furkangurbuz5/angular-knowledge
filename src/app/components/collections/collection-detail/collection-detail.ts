import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Ingredient, IngredientWithQuantity } from '../../../model/ingredient.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../../../service/food-service';
import { catchError, finalize, forkJoin, take, tap, throwError } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Collection, CollectionProperties } from '../../../model/collection.model';
import { CollectionService } from '../../../service/collection-service';
import {
  AddFoodToCollectionRequest,
  DeleteFoodFromCollectionRequest,
} from '../../../dto/collection-request.dto';
import { FoodCard } from '../../foods/food-list/food-card/food-card';
import { CollectionStats } from './collection-stats/collection-stats';
import { CollectionFoodCard } from './collection-food-card/collection-food-card';

@Component({
  selector: 'app-collection-detail',
  imports: [FormsModule, ReactiveFormsModule, FoodCard, CollectionStats, CollectionFoodCard],
  templateUrl: './collection-detail.html',
  styleUrl: './collection-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionDetail {
  collectionId = signal(0);
  collection = signal<Collection>({ id: 0, name: '' });
  isLoading = signal(true);
  hasError = signal(false);
  errorMessage = signal<string>('');
  deleted = signal<boolean>(false);
  collectionFoods = signal<IngredientWithQuantity[]>([]);
  collectionProperties = signal<CollectionProperties[]>([]);
  foods = signal<Ingredient[]>([]);
  selectedFood = signal<Ingredient>({ id: 0, name: '', servingSize: 0, unit: '' });

  foodId: number = 0;
  quantity: number = 0;

  protected router: Router = inject(Router);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly foodService: FoodService = inject(FoodService);
  private readonly collectionService: CollectionService = inject(CollectionService);

  ngOnInit() {
    this.collectionId.set(+this.route.snapshot.paramMap.get('id')!);
    if (this.collectionId()) {
      this.loadCollectionAndFoods();
    }
  }

  protected onBack(): void {
    this.router.navigate(['/collections']).then(() => console.log('navigating to /collections'));
  }

  protected onFoodDelete(food: IngredientWithQuantity): void {
    const foodToDelete: DeleteFoodFromCollectionRequest = {
      ingredient_id: food.id,
    };
    this.collectionService
      .deleteFoodFromCollection(this.collectionId(), foodToDelete)
      .pipe(
        finalize(() => {
          this.loadCollectionAndFoods();
        }),
      )
      .subscribe();
  }

  protected onDelete(collection: Collection): void {
    this.collectionService
      .deleteCollectionById(collection.id)
      .pipe(
        take(1),
        finalize(() => {
          this.deleted.set(true);
          this.onBack();
        }),
      )
      .subscribe();
  }

  protected addFoodToCollection() {
    if (!this.foodId || !this.quantity) {
      return;
    }
    const addFoodToCollectionRequest: AddFoodToCollectionRequest = {
      ingredient_id: this.foodId,
      quantity: this.quantity,
    };

    this.collectionService
      .addFoodToCollection(this.collectionId(), addFoodToCollectionRequest)
      .pipe(
        take(1),
        catchError(() => {
          return throwError(() => new Error("Couldn't add food to the collection."));
        }),
        finalize(() => {
          this.updateCollectionFoods();
          this.foodId = 0;
          this.quantity = 0;
          this.selectedFood.set({
            id: 0,
            name: '',
            servingSize: 0,
            unit: '',
          });
        }),
      )
      .subscribe({
        error: (err: Error) => {
          this.hasError.set(true);
          this.errorMessage.set(err.message);
        },
      });
  }

  protected getSelectedFood() {
    if (!this.foodId) {
      return;
    }
    this.foodService
      .getFoodById(this.foodId)
      .pipe(
        tap((food) => {
          this.selectedFood.set(food);
        }),
      )
      .subscribe((food) => {
        console.log(food);
      });
  }

  private loadCollectionAndFoods() {
    forkJoin({
      collectionWithFoods: this.collectionService.getFoodsByCollectionId(this.collectionId()),
      foods: this.foodService.getAllFoods(),
    })
      .pipe(
        take(1),
        tap(({ collectionWithFoods }) => {
          if (!collectionWithFoods.collection) {
            throw Error('No collection found!');
          }
        }),
        finalize(() => {
          this.isLoading.set(false);
        }),
      )
      .subscribe({
        next: ({ collectionWithFoods, foods }) => {
          this.collection.set(collectionWithFoods.collection);
          this.collectionFoods.set(collectionWithFoods.foods);
          this.collectionProperties.set(collectionWithFoods.collectionProperties);
          this.foods.set(foods);
        },
        error: (error: Error) => {
          this.hasError.set(true);
          this.errorMessage.set(error.message);
        },
      });
  }

  private updateCollectionFoods() {
    this.collectionService
      .getFoodsByCollectionId(this.collectionId())
      .pipe(take(1))
      .subscribe((collectionWithFoods) => {
        this.collectionFoods.set(collectionWithFoods.foods);
        this.collectionProperties.set(collectionWithFoods.collectionProperties);
      });
  }
}
