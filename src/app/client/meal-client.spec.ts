import { TestBed } from '@angular/core/testing';

import { MealClient } from './meal-client';

describe('MealClient', () => {
  let service: MealClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MealClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
