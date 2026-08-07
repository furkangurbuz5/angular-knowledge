import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { StatItem } from '../../../model/person-stats.model';

@Component({
  selector: 'app-distribution-chart',
  imports: [],
  templateUrl: './distribution-chart.html',
  styleUrl: './distribution-chart.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DistributionChart {
  title = input.required<string>();
  data = input.required<StatItem[]>();

  private colorMap: Record<string, string> = {};

  getBarColor(label: string): string {
    if (!this.colorMap[label]) {
      const colors = [
        '#4CAF50',
        '#2196F3',
        '#FFC107',
        '#FF5722',
        '#9C27B0',
        '#00BCD4',
        '#E91E63',
        '#FF9800',
      ];
      const index = Object.keys(this.colorMap).length % colors.length;
      this.colorMap[label] = colors[index];
    }
    return this.colorMap[label];
  }
}
