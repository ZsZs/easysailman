import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceTabsComponent } from './race-tabs.component';

describe('RaceToolbarComponent', () => {
  let component: RaceTabsComponent;
  let fixture: ComponentFixture<RaceTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
