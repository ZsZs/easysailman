import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SailorStatusbarComponent } from './sailor-statusbar.component';

describe('SailorSatusbarComponent', () => {
  let component: SailorStatusbarComponent;
  let fixture: ComponentFixture<SailorStatusbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SailorStatusbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SailorStatusbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
