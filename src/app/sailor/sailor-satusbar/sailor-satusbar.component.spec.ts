import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SailorSatusbarComponent } from './sailor-satusbar.component';

describe('SailorSatusbarComponent', () => {
  let component: SailorSatusbarComponent;
  let fixture: ComponentFixture<SailorSatusbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SailorSatusbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SailorSatusbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
