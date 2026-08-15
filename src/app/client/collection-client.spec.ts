import { TestBed } from '@angular/core/testing';

import { CollectionClient } from './collection-client';

describe('CollectionClient', () => {
  let service: CollectionClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollectionClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
