import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceStartComponent } from './race-start.component';

describe('RaceStartComponent', () => {
  let component: RaceStartComponent;
  let fixture: ComponentFixture<RaceStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
