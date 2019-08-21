import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceRegistrationComponent } from './race-registration.component';

describe('RaceRegistrationComponent', () => {
  let component: RaceRegistrationComponent;
  let fixture: ComponentFixture<RaceRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
