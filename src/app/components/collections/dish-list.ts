import { Component, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { finalize, take, tap } from 'rxjs';
import { RouterLink } from '@angular/router';
import { Dish } from '../../model/dish.model';
import { CreateDishRequest } from '../../dto/dish-request.dto';
import { DishService } from '../../service/dish-service';

@Component({
  selector: 'app-dish-list',
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './dish-list.html',
  styleUrl: './dish-list.css',
})
export class DishList {
  private readonly dishService = inject(DishService);
  protected readonly dishes = signal<Dish[]>([]);
  protected dish = '';

  ngOnInit() {
    this.fetchDishes();
  }

  protected addDish() {
    if (!this.dish) {
      return;
    }

    const dish: CreateDishRequest = {
      name: this.dish,
    };

    this.dishService
      .addDish(dish)
      .pipe(
        take(1),
        finalize(() => {
          this.fetchDishes();
          this.dish = '';
        }),
      )
      .subscribe();
  }

  private fetchDishes() {
    this.dishService
      .getAllDishes()
      .pipe(
        take(1),
        tap((collections) => {
          this.dishes.set(collections);
        }),
      )
      .subscribe();
  }
}
