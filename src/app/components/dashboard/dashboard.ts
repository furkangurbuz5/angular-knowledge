import { Component, inject, OnInit, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { FoodService } from '../../service/food-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  isLoading = signal(true);
  error = signal<string | null>(null);

  private foodService = inject(FoodService);

  ngOnInit(): void {
    forkJoin({
      foods: this.foodService.getAllFoods(),
    }).subscribe({
      next: ({ foods }) => {
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load data.');
        this.isLoading.set(false);
      },
    });
  }
}
