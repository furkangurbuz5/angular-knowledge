import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActionCard } from './user-action-card';

describe('UserActionCard', () => {
  let component: UserActionCard;
  let fixture: ComponentFixture<UserActionCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserActionCard],
    }).compileComponents();

    fixture = TestBed.createComponent(UserActionCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
