import { Component, inject, OnInit, signal } from '@angular/core';
import { PersonService } from '../../service/person-service';
import { Person } from '../../model/person.model';
import { calculatePersonStats, PersonStats, StatItem } from '../../model/person-stats.model';
import { StatsCard } from './stats-card/stats-card';
import { DistributionChart } from './distribution-chart/distribution-chart';
import { calculateFoodStats, FoodStats } from '../../model/food-stats.model';
import { forkJoin } from 'rxjs';
import { FoodService } from '../../service/food-service';

@Component({
  selector: 'app-dashboard',
  imports: [StatsCard, DistributionChart],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  persons = signal<Person[]>([]);
  isLoading = signal(true);
  error = signal<string | null>(null);
  personStats = signal<PersonStats>({
    totalPersons: 0,
    carStats: [],
    countryStats: [],
    bankStats: [],
    cityStats: [],
  });
  foodStats = signal<FoodStats>({
    totalFoods: 0,
    propertyStats: [],
    foodStats: [],
  });
  private personService = inject(PersonService);
  private foodService = inject(FoodService);

  ngOnInit(): void {
    forkJoin({
      persons: this.personService.getAllPersons(),
      foods: this.foodService.getAllFoods(),
    }).subscribe({
      next: ({ persons, foods }) => {
        this.persons.set(persons);
        this.personStats.set(calculatePersonStats(persons));
        this.foodStats.set(calculateFoodStats(foods));
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load persons data.');
        this.isLoading.set(false);
      },
    });
  }

  getPercentageByLabel(stats: StatItem[], label: string): string {
    const item = stats.find((i) => i.label === label);
    return item ? item.percentage.toFixed(1) + '%' : '0%';
  }
}
