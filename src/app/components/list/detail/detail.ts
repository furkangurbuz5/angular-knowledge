import { Component, inject, signal } from '@angular/core';
import { Person } from '../../../model/person.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../../service/person-service';
import { Card } from './card/card';
import { Action } from './action/action';
import { finalize, take } from 'rxjs';

@Component({
  selector: 'app-detail',
  imports: [Card, Action],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class Detail {
  person = signal<Person | null>(null);
  isLoading = signal(true);
  hasError = signal(false);
  errorMessage = signal<string>('');
  deleted = signal<boolean>(false);

  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private readonly personService: PersonService = inject(PersonService);

  ngOnInit() {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.personService
        .getPersonById(id)
        .pipe(
          take(1),
          finalize(() => {
            this.isLoading.set(false);
          }),
        )
        .subscribe({
          next: (person) => {
            this.person.set(person);
          },
          error: () => {
            this.hasError.set(true);
            this.errorMessage.set('Failed to load person details.');
          },
        });
    }
  }

  onBack(): void {
    this.router.navigate(['/persons']).then(() => console.log('navigating to /persons'));
  }
  onDelete(person: Person) {
    this.personService
      .deletePersonById(person.id)
      .pipe(
        take(1),
        finalize(() => {
          this.deleted.set(true);
        }),
      )
      .subscribe({});
  }
}
