import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, take } from 'rxjs';
import { Ingredient } from '../../../../model/ingredient.model';
import { FoodService } from '../../../../service/food-service';
import { Action } from '../../../shared/action/action';
import { PropertyCard } from '../../property/property-card/property-card';
import { FoodCard } from '../food-card/food-card';

@Component({
  selector: 'app-food-detail',
  imports: [Action, PropertyCard, FoodCard],
  templateUrl: './food-detail.html',
  styleUrl: './food-detail.css',
})
export class FoodDetail {
  food = signal<Ingredient | null>(null);
  isLoading = signal(true);
  hasError = signal(false);
  errorMessage = signal<string>('');
  deleted = signal<boolean>(false);

  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private readonly foodService: FoodService = inject(FoodService);

  ngOnInit() {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.foodService
        .getFoodById(+id)
        .pipe(
          take(1),
          finalize(() => {
            this.isLoading.set(false);
          }),
        )
        .subscribe({
          next: (food) => {
            this.food.set(food);
          },
          error: () => {
            this.hasError.set(true);
            this.errorMessage.set('Failed to load food details.');
          },
        });
    }
  }

  onBack(): void {
    this.router.navigate(['/foods']).then(() => console.log('navigating to /foods'));
  }

  onDelete(food: Ingredient): void {
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
}
