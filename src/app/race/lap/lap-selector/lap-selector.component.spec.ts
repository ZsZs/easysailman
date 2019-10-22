import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LapSelectorComponent } from './lap-selector.component';

describe('RoundSelectorComponent', () => {
  let component: LapSelectorComponent;
  let fixture: ComponentFixture<LapSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LapSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LapSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
