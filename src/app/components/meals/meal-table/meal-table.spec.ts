import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealTable } from './meal-table';

describe('MealTable', () => {
  let component: MealTable;
  let fixture: ComponentFixture<MealTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealTable],
    }).compileComponents();

    fixture = TestBed.createComponent(MealTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
