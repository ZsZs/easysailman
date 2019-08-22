import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YachtClubComponent } from './yacht-club.component';

describe('YachtClubComponent', () => {
  let component: YachtClubComponent;
  let fixture: ComponentFixture<YachtClubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YachtClubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YachtClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
