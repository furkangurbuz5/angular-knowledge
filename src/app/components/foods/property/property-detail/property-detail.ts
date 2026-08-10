import { Component, inject, signal } from '@angular/core';
import { Person } from '../../../../model/person.model';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, take, tap } from 'rxjs';
import { Property } from '../../../../model/properties.model';
import { PropertyService } from '../../../../service/property-service';
import { Action } from '../../../shared/action/action';
import { PropertyCard } from '../property-card/property-card';

@Component({
  selector: 'app-property-detail',
  imports: [Action, PropertyCard],
  templateUrl: './property-detail.html',
  styleUrl: './property-detail.css',
})
export class PropertyDetail {
  property = signal<Property | null>(null);
  isLoading = signal(true);
  hasError = signal(false);
  errorMessage = signal<string>('');
  deleted = signal<boolean>(false);

  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private readonly propertyService: PropertyService = inject(PropertyService);

  ngOnInit() {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.propertyService
        .getPropertyById(+id)
        .pipe(
          take(1),
          finalize(() => {
            this.isLoading.set(false);
          }),
        )
        .subscribe({
          next: (person) => {
            this.property.set(person);
          },
          error: () => {
            this.hasError.set(true);
            this.errorMessage.set('Failed to load property details.');
          },
        });
    }
  }

  onBack(): void {
    this.router.navigate(['/properties']).then(() => console.log('navigating to /properties'));
  }
  onDelete(person: Person) {
    this.propertyService
      .deletePropertyById(person.id)
      .pipe(
        take(1),
        finalize(() => {
          this.deleted.set(true);
        }),
      )
      .subscribe();
  }
}
