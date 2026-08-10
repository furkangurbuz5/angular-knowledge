import { TestBed } from '@angular/core/testing';

import { PropertyClient } from './property-client';

describe('PropertyClient', () => {
  let service: PropertyClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertyClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
