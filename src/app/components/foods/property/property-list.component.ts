import { Component, inject, signal } from '@angular/core';
import { PropertyService } from '../../../service/property-service';
import { finalize, switchMap, take, tap } from 'rxjs';
import { Property } from '../../../model/properties.model';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { mapOptionToUnitId, UnitOption } from '../../../util/unit-mapper';

@Component({
  selector: 'app-property',
  imports: [FormsModule, RouterLink],
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.css',
})
export class PropertyList {
  protected readonly properties = signal<Property[]>([]);
  protected property: string = '';
  protected unit: string = '';
  private readonly propertyService = inject(PropertyService);

  ngOnInit() {
    this.updateProperties().subscribe();
  }

  protected addProperty() {
    if (!this.property || !this.unit) {
      return;
    }
    const unitId: number = mapOptionToUnitId(this.unit.toLowerCase() as UnitOption);

    this.propertyService
      .addProperty({
        name: this.property,
        unit_id: unitId,
      })
      .pipe(
        take(1),
        switchMap(() => {
          return this.updateProperties();
        }),
        finalize(() => {
          this.property = '';
          this.unit = '';
        })
      )
      .subscribe();
  }

  private updateProperties() {
    return this.propertyService.getAllProperties().pipe(
      take(1),
      tap((properties) => {
        this.properties.set(properties);
      }),
    );
  }
}
