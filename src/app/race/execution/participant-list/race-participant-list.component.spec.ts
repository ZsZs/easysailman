import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceParticipantListComponent } from './race-participant-list.component';

describe('RaceParticipantsComponent', () => {
  let component: RaceParticipantListComponent;
  let fixture: ComponentFixture<RaceParticipantListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceParticipantListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceParticipantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
