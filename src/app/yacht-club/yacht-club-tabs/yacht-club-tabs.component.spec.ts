import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YachtClubTabsComponent } from './yacht-club-tabs.component';

describe('YachtClubTabsComponent', () => {
  let component: YachtClubTabsComponent;
  let fixture: ComponentFixture<YachtClubTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YachtClubTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YachtClubTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
