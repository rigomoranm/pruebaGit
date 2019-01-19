import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerPagoComponent } from './ter-pago.component';

describe('TerPagoComponent', () => {
  let component: TerPagoComponent;
  let fixture: ComponentFixture<TerPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
