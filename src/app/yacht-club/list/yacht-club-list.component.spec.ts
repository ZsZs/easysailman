import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YachtClubListComponent } from './yacht-club-list.component';

describe('YachtClubListComponent', () => {
  let component: YachtClubListComponent;
  let fixture: ComponentFixture<YachtClubListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YachtClubListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YachtClubListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
