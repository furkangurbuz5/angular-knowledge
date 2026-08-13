import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonFoodDetail } from './person-food-detail';

describe('PersonFoodDetail', () => {
  let component: PersonFoodDetail;
  let fixture: ComponentFixture<PersonFoodDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonFoodDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonFoodDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
