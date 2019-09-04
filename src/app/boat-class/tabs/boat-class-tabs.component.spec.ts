import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatClassTabsComponent } from './boat-class-tabs.component';

describe('BoatClassTabsComponent', () => {
  let component: BoatClassTabsComponent;
  let fixture: ComponentFixture<BoatClassTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoatClassTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatClassTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
