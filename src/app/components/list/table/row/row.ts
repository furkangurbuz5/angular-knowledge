import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { Person } from '../../../../model/person.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-row',
  imports: [RouterLink],
  templateUrl: './row.html',
  styleUrl: './row.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Row {
  readonly person: InputSignal<Person> = input.required<Person>();
}
