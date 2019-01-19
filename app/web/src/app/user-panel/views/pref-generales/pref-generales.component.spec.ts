import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefGeneralesComponent } from './pref-generales.component';

describe('PrefGeneralesComponent', () => {
  let component: PrefGeneralesComponent;
  let fixture: ComponentFixture<PrefGeneralesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrefGeneralesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
