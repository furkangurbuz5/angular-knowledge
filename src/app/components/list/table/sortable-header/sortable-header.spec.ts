import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortableHeader } from './sortable-header';

describe('SortableHeader', () => {
  let component: SortableHeader;
  let fixture: ComponentFixture<SortableHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortableHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(SortableHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
