import { Component, input, output } from '@angular/core';
import { Person } from '../../../../model/person.model';

@Component({
  selector: 'app-action',
  imports: [],
  templateUrl: './action.html',
  styleUrl: './action.css',
})
export class Action {
  person = input.required<Person>();
  onEdit = output<Person>();
  onDelete = output<Person>();
  onBack = output<void>();
}
