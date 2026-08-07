import { Component, inject, OnInit, signal } from '@angular/core';
import { PersonService } from '../../service/person-service';
import { Person } from '../../model/person.model';
import { calculatePersonStats, PersonStats, StatItem } from '../../model/person-stats.model';
import { StatsCard } from './stats-card/stats-card';
import { DistributionChart } from './distribution-chart/distribution-chart';

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
  stats = signal<PersonStats>({
    totalPersons: 0,
    carStats: [],
    countryStats: [],
    bankStats: [],
    cityStats: [],
  });
  private personService = inject(PersonService);

  ngOnInit(): void {
    this.personService.getAllPersons().subscribe({
      next: (persons) => {
        this.persons.set(persons);
        this.stats.set(calculatePersonStats(persons));
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
