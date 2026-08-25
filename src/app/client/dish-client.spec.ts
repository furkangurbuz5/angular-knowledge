import { TestBed } from '@angular/core/testing';

import { DishClient } from './dish-client';

describe('DishClient', () => {
  let service: DishClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DishClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
