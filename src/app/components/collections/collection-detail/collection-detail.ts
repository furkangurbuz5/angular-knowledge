import { Component, inject, signal } from '@angular/core';
import { Ingredient } from '../../../model/ingredient.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../../../service/food-service';
import { catchError, finalize, forkJoin, take, throwError } from 'rxjs';
import { Action } from '../../shared/action/action';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Collection } from '../../../model/collection.model';
import { CollectionService } from '../../../service/collection-service';
import { AddFoodToCollectionRequest } from '../../../dto/collection-request.dto';
import { CollectionFoodCard } from './collection-food-card/collection-food-card';

@Component({
  selector: 'app-collection-detail',
  imports: [Action, FormsModule, ReactiveFormsModule, CollectionFoodCard],
  templateUrl: './collection-detail.html',
  styleUrl: './collection-detail.css',
})
export class CollectionDetail {
  collectionId = signal(0);
  collection = signal<Collection>({ id: 0, name: "" });
  isLoading = signal(true);
  hasError = signal(false);
  errorMessage = signal<string>('');
  deleted = signal<boolean>(false);
  collectionFoods = signal<Ingredient[]>([]);
  foods = signal<Ingredient[]>([]);

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
    if(!this.foodId || !this.quantity) {
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
        }),
      )
      .subscribe({
        error: (err: Error) => {
          this.hasError.set(true);
          this.errorMessage.set(err.message);
        },
      });
  }

  private loadCollectionAndFoods() {
    forkJoin({
      collection: this.collectionService.getCollectionById(this.collectionId()),
      collectionFoods: this.collectionService.getFoodsByCollectionId(this.collectionId()),
      foods: this.foodService.getAllFoods(),
    })
      .pipe(
        take(1),
        finalize(() => {
          this.isLoading.set(false);
        }),
      )
      .subscribe({
        next: ({ collection, collectionFoods, foods }) => {
          this.collection.set(collection);
          this.collectionFoods.set(collectionFoods);
          this.foods.set(foods);
        },
        error: () => {
          this.hasError.set(true);
          this.errorMessage.set('Failed to load collection details.');
        },
      });
  }

  private updateCollectionFoods() {
    this.collectionService
      .getFoodsByCollectionId(this.collectionId())
      .pipe(take(1))
      .subscribe((properties) => {
        this.collectionFoods.set(properties);
      });
  }
}
