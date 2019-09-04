import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatClassListComponent } from './boat-class-list.component';

describe('BoatClassListComponent', () => {
  let component: BoatClassListComponent;
  let fixture: ComponentFixture<BoatClassListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoatClassListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatClassListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
