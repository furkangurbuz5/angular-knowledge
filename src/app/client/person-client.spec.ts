import { TestBed } from '@angular/core/testing';

import { PersonClient } from './person-client';

describe('PersonClient', () => {
  let service: PersonClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
