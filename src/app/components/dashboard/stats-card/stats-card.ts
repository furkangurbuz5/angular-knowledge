import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-stats-card',
  imports: [],
  templateUrl: './stats-card.html',
  styleUrl: './stats-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsCard {
  title = input.required<string>();
  value = input.required<string | number>();
  subtitle = input<string>('');
}
