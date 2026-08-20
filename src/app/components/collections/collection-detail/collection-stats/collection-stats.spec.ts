import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionStats } from './collection-stats';

describe('CollectionStats', () => {
  let component: CollectionStats;
  let fixture: ComponentFixture<CollectionStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionStats],
    }).compileComponents();

    fixture = TestBed.createComponent(CollectionStats);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
