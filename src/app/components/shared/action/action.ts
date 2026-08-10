import { Component, input, output } from '@angular/core';
import { Person } from '../../../model/person.model';

@Component({
  selector: 'app-action',
  imports: [],
  templateUrl: './action.html',
  styleUrl: './action.css',
})
export class Action<T> {
  item = input.required<T>();
  onEdit = output<T>();
  onDelete = output<T>();
  onBack = output<void>();
}
