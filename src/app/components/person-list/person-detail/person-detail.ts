import { Component, inject, signal } from '@angular/core';
import { Person } from '../../../model/person.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../../service/person-service';
import { Card } from './card/card';
import { Action } from '../../shared/action/action';
import { finalize, take } from 'rxjs';
import { IngredientWithProperties } from '../../../model/ingredient.model';
import { PersonFoodDetail } from './person-food-detail/person-food-detail';

@Component({
  selector: 'app-person-detail',
  imports: [Card, Action, PersonFoodDetail],
  templateUrl: './person-detail.html',
  styleUrl: './person-detail.css',
})
export class PersonDetail {
  person = signal<Person | null>(null);
  foods = signal<IngredientWithProperties[]>([]);
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
        .getPersonWithIngredientsById(id)
        .pipe(
          take(1),
          finalize(() => {
            this.isLoading.set(false);
          }),
        )
        .subscribe({
          next: (personWithIngredients) => {
            console.log(personWithIngredients);
            this.person.set(personWithIngredients.person);
            this.foods.set(personWithIngredients.ingredientsWithProperties);
          },
          error: () => {
            this.hasError.set(true);
            this.errorMessage.set('Failed to load person details.');
          },
        });
    }
  }

  protected onBack(): void {
    this.router.navigate(['/persons']).then(() => console.log('navigating to /persons'));
  }
  protected onDelete(person: Person) {
    this.personService
      .deletePersonById(person.id)
      .pipe(
        take(1),
        finalize(() => {
          this.deleted.set(true);
          this.onBack();
        }),
      )
      .subscribe({});
  }
}
