import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-action',
  imports: [],
  templateUrl: './action.html',
  styleUrl: './action.css',
})
export class Action<T> {
  item = input.required<T>();
  onEdit = output<void>();
  onDelete = output<T>();
  onBack = output<void>();
}
