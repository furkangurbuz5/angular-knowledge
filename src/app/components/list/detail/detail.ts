import { Component, inject, signal } from '@angular/core';
import { Person } from '../../../model/person.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../../service/person-service';
import { Card } from './card/card';
import { Action } from './action/action';

@Component({
  selector: 'app-detail',
  imports: [Card, Action],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class Detail {
  person = signal<Person | null>(null);
  isLoading = signal(true);
  error = signal<string | null>(null);

  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private readonly personService: PersonService = inject(PersonService);

  ngOnInit() {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.personService.getPersonById(id).subscribe({
        next: (person) => {
          this.person.set(person);
          this.isLoading.set(false);
        },
        error: (err) => {
          this.error.set('Failed to load person details.');
          this.isLoading.set(false);
        },
      });
    }
  }

  onBack(): void {
    this.router.navigate(['/persons']);
  }
}
