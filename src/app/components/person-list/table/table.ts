import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  signal,
} from '@angular/core';
import { Row } from './row/row';
import { Person } from '../../../model/person.model';

@Component({
  selector: 'app-table',
  imports: [Row],
  templateUrl: './table.html',
  styleUrl: './table.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Table {
  readonly persons: InputSignal<Person[]> = input.required<Person[]>();
  sortField = signal<string | null>(null);
  sortDirection = signal<'asc' | 'desc'>('asc');

  sortedPersons = computed(() => {
    const field = this.sortField();
    const direction = this.sortDirection();
    if (!field) return this.persons();

    return [...this.persons()].sort((a, b) => {
      const aValue = a[field as keyof Person];
      const bValue = b[field as keyof Person];
      return direction === 'asc' ? (aValue < bValue ? -1 : 1) : aValue > bValue ? -1 : 1;
    });
  });

  onSort(field: string) {
    if (this.sortField() === field) {
      this.sortDirection.update((dir) => (dir === 'asc' ? 'desc' : 'asc'));
    } else {
      this.sortField.set(field);
      this.sortDirection.set('asc');
    }
  }
}
