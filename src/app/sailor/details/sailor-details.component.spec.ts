import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SailorDetailsComponent } from './sailor-details.component';

describe('SailorDetailsComponent', () => {
  let component: SailorDetailsComponent;
  let fixture: ComponentFixture<SailorDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SailorDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SailorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
