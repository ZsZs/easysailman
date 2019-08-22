import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SailorBoatsComponent } from './sailor-boats.component';

describe('SailorBoatsComponent', () => {
  let component: SailorBoatsComponent;
  let fixture: ComponentFixture<SailorBoatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SailorBoatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SailorBoatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
