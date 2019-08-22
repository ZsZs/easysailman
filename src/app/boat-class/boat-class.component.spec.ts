import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatClassComponent } from './boat-class.component';

describe('BoatClassComponent', () => {
  let component: BoatClassComponent;
  let fixture: ComponentFixture<BoatClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoatClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
