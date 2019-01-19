import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';


@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.scss']
})
export class ConfirmacionComponent implements OnInit {

  constructor() { }

  @ViewChild('modalConfirmacion') public modalConfirmacion:ModalDirective;
  @Output()  evtConfirmacionAceptar : EventEmitter<number>= new EventEmitter();
  ngOnInit() {
  }

  mostrar():void{
    this.modalConfirmacion.show();
  }
  ocultar():void{
    this.modalConfirmacion.hide();
  }


  aceptar():void{

    this.evtConfirmacionAceptar.emit();
  

  }

}
