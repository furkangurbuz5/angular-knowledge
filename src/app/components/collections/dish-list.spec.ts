import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishList } from './dish-list';

describe('Collections', () => {
  let component: DishList;
  let fixture: ComponentFixture<DishList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DishList],
    }).compileComponents();

    fixture = TestBed.createComponent(DishList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
