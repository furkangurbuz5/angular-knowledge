import { Component, input } from '@angular/core';
import { Person } from '../../../../model/person.model';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  person = input.required<Person>();
}
