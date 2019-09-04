import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatClassDetailsComponent } from './boat-class-details.component';

describe('BoatClassDetailsComponent', () => {
  let component: BoatClassDetailsComponent;
  let fixture: ComponentFixture<BoatClassDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoatClassDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatClassDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
