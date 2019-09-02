import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceFieldComponent } from './race-field.component';

describe('RaceFieldComponent', () => {
  let component: RaceFieldComponent;
  let fixture: ComponentFixture<RaceFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
