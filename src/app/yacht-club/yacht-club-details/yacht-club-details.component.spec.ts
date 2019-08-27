import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YachtClubDetailsComponent } from './yacht-club-details.component';

describe('YachtClubDetailsComponent', () => {
  let component: YachtClubDetailsComponent;
  let fixture: ComponentFixture<YachtClubDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YachtClubDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YachtClubDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
