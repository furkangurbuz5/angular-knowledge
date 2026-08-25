import { TestBed } from '@angular/core/testing';

import { DishService } from './dish-service';
import { DishClient } from '../client/dish-client';

describe('DishService', () => {
  let service: DishService;
  let client: DishClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DishService);
    client = TestBed.inject(DishClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
