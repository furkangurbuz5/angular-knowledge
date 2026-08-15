import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionFoodCard } from './collection-food-card';

describe('CollectionFoodCard', () => {
  let component: CollectionFoodCard;
  let fixture: ComponentFixture<CollectionFoodCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionFoodCard],
    }).compileComponents();

    fixture = TestBed.createComponent(CollectionFoodCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
