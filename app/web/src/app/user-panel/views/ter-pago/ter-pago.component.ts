import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { TerminosPago } from 'src/app/shared/models/terminosPago';
import { TerminosPagoService } from 'src/app/services/terminos-pago.service';


@Component({
  selector: 'app-ter-pago',
  templateUrl: './ter-pago.component.html',
  styleUrls: ['./ter-pago.component.scss']
})
export class TerPagoComponent implements OnInit {

  constructor(
    private terminosPagoService:TerminosPagoService,
  ) { }

  
  ngOnInit() {
    this.terPago = new TerminosPago();

    
    //Carga la lista de impuestos del usuario
    this.cargarTerminosPago();
    this.limpiar();
    
  }
  @ViewChildren('selTerPago') selTerPago;
  
  terPago:TerminosPago;
  terPagoUsuario:TerminosPago[];
  mostrarNotificacion:boolean;
  mensajeNotificacion:string;
  mostrarMensajeError:boolean;
  mensajeError:string;
  idEliminar:number;



   
  ///Obtiene los usuarios del servicio y lo asigna en el arreglo
  cargarTerminosPago(): void {
    ///Manda llamar al servicio para obtener los impuestos
    this.terminosPagoService.cargar().subscribe(result => {
    
      if(result != null){

        this.terPagoUsuario = result;
      }
    },
    error=>{
    
    });
  }

    agregar():void{

      this.mostrarNotificacion = false;
      this.mostrarMensajeError = false;
      if(this.terPago.id ==  undefined || this.terPago.id == 0){
          this.terminosPagoService.agregar(this.terPago).subscribe(result => {
            if(result != null){
              this.mensajeNotificacion = 'Término de pago ' + this.terPago.nombre + ' agregado correctamente';
              this.mostrarNotificacion = true;
              this.limpiar();
              ///Agrega el elemento devuelto en la primera posicion
              result.estado = true;
              this.terPagoUsuario.unshift(result);
            }
          },
          error=>{
          
          });
      }
      else{
        this.terminosPagoService.actualizar(this.terPago, this.terPago.id).subscribe(result => {
          if(result != null ){
            if(result.status != undefined && result.status != 200){
              this.mensajeError = 'Ocurrio un error en la petición';
              this.mostrarMensajeError = true;
            }else{
              this.mensajeNotificacion = 'Se edito el término de pago ' + this.terPago.nombre;
              this.mostrarNotificacion = true;
              this.limpiar();
              this.cargarTerminosPago();
            }
          }
        },
        error=>{
        
        });
      }

    }

    limpiar():void{

      this.terPago = new  TerminosPago();
      this.terPago.dias = 0;
    }

    editar(id) :void{

      this.terminosPagoService.cargarXId(id).subscribe(result => {
    
        if(result != null){
  
          this.terPago = result;
          
        }
      },
      error=>{
      
      });
    }

    actualizarEstatus(terminoPago){

      //Asigna el id
      terminoPago.estado = !terminoPago.estado;
      this.terminosPagoService.actualizarEstatus(terminoPago, terminoPago.id).subscribe(result => {
        if(result != null ){
          if(result.status != undefined && result.status != 200){
            this.mensajeError = 'Ocurrio un error en la petición';
            this.mostrarMensajeError = true;
          }else{
            this.mensajeNotificacion = 'Se actualizo el estatus';
            this.mostrarNotificacion = true;
            this.limpiar();
            this.cargarTerminosPago();
          }
        }
      },
      error=>{
      
      });
    }
   
    closeAlert() {
      this.mostrarNotificacion = false;
      this.mostrarMensajeError = false;
    }
  
}
