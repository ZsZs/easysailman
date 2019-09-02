import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceExecutionToolbarComponent } from './race-execution-toolbar.component';

describe('RaceExecutionToolbarComponent', () => {
  let component: RaceExecutionToolbarComponent;
  let fixture: ComponentFixture<RaceExecutionToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceExecutionToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceExecutionToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
