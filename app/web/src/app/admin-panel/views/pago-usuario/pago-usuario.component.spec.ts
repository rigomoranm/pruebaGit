import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoUsuarioComponent } from './pago-usuario.component';

describe('PagoUsuarioComponent', () => {
  let component: PagoUsuarioComponent;
  let fixture: ComponentFixture<PagoUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
