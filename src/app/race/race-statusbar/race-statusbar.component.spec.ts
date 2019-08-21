import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceStatusbarComponent } from './race-statusbar.component';

describe('RaceStatusbarComponent', () => {
  let component: RaceStatusbarComponent;
  let fixture: ComponentFixture<RaceStatusbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceStatusbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceStatusbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
