import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceFinishComponent } from './race-finish.component';

describe('RaceFinishComponent', () => {
  let component: RaceFinishComponent;
  let fixture: ComponentFixture<RaceFinishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceFinishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
