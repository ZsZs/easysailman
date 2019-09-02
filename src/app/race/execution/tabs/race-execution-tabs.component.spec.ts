import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceExecutionTabsComponent } from './race-execution-tabs.component';

describe('TabsComponent', () => {
  let component: RaceExecutionTabsComponent;
  let fixture: ComponentFixture<RaceExecutionTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceExecutionTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceExecutionTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
