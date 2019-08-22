import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SailorTabsComponent } from './sailor-tabs.component';

describe('SailorTabsComponent', () => {
  let component: SailorTabsComponent;
  let fixture: ComponentFixture<SailorTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SailorTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SailorTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
