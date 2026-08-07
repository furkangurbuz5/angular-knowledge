import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributionChart } from './distribution-chart';

describe('DistributionChart', () => {
  let component: DistributionChart;
  let fixture: ComponentFixture<DistributionChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistributionChart],
    }).compileComponents();

    fixture = TestBed.createComponent(DistributionChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
