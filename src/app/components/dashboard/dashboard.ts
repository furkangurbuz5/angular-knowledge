import { Component, inject, OnInit, signal } from '@angular/core';
import { StatItem } from '../../model/person-stats.model';
import { calculateFoodStats, FoodStats } from '../../model/food-stats.model';
import { forkJoin } from 'rxjs';
import { FoodService } from '../../service/food-service';
import { DistributionChart } from './distribution-chart/distribution-chart';

@Component({
  selector: 'app-dashboard',
  imports: [DistributionChart],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  isLoading = signal(true);
  error = signal<string | null>(null);
  foodStats = signal<FoodStats>({
    totalFoods: 0,
    propertyStats: [],
    foodStats: [],
  });
  private foodService = inject(FoodService);

  ngOnInit(): void {
    forkJoin({
      foods: this.foodService.getAllFoods(),
    }).subscribe({
      next: ({ foods }) => {
        this.foodStats.set(calculateFoodStats(foods));
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load data.');
        this.isLoading.set(false);
      },
    });
  }

  getPercentageByLabel(stats: StatItem[], label: string): string {
    const item = stats.find((i) => i.label === label);
    return item ? item.percentage.toFixed(1) + '%' : '0%';
  }
}
