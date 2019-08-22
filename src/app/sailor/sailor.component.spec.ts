import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SailorComponent } from './sailor.component';

describe('SailorManagementComponent', () => {
  let component: SailorComponent;
  let fixture: ComponentFixture<SailorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SailorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SailorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
