import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SailorListComponent } from './sailor-list.component';

describe('SailorListComponent', () => {
  let component: SailorListComponent;
  let fixture: ComponentFixture<SailorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SailorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SailorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
