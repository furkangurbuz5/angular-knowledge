import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Formy } from './formy';

describe('Formy', () => {
  let component: Formy;
  let fixture: ComponentFixture<Formy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Formy],
    }).compileComponents();

    fixture = TestBed.createComponent(Formy);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
