import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceExecutionComponent } from './race-execution.component';

describe('RaceExecutionComponent', () => {
  let component: RaceExecutionComponent;
  let fixture: ComponentFixture<RaceExecutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceExecutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceExecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
