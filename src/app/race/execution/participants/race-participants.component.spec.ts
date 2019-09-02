import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceParticipantsComponent } from './race-participants.component';

describe('RaceParticipantsComponent', () => {
  let component: RaceParticipantsComponent;
  let fixture: ComponentFixture<RaceParticipantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceParticipantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
