import { Component, input } from '@angular/core';
import { UserAction } from '../../../types/user-action.type';

@Component({
  selector: 'app-user-action-card',
  imports: [],
  templateUrl: './user-action-card.html',
  styleUrl: './user-action-card.css',
})
export class UserActionCard {
  public readonly userAction = input.required<UserAction>();


}
