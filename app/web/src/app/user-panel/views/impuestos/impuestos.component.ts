import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { TipoImpuesto } from 'src/app/shared/models/tipoImpuesto';
import { TipoImpuestoService } from 'src/app/services/tipo-impuesto.service';
import { Impuestos } from 'src/app/shared/models/impuestos';
import { ImpuestosService } from 'src/app/services/impuestos.service';
import { ConfirmacionComponent } from '../../components/confirmacion/confirmacion.component';

@Component({
  selector: 'app-impuestos',
  templateUrl: './impuestos.component.html',
  styleUrls: ['./impuestos.component.scss']
})
export class ImpuestosComponent implements OnInit {

  constructor(
    private tipoImpuestoService:TipoImpuestoService,
    private impuestosService:ImpuestosService
  ) { }

  ngOnInit() {
    this.cargarTipoImpuesto();
    this.impuestos = new Impuestos();

    
    //Carga la lista de impuestos del usuario
    this.cargarImpuestos();
  
    ///Se subscribe al evento que indica que se acepto la confirmacion
    this.appConfirmacion.evtConfirmacionAceptar.subscribe(result=>{
      ///Elimina el id seleccionado
      this.eliminar();
    });
  }


  @ViewChildren('selTipoImpuesto') selTipoImpuesto;
  @ViewChild('appConfirmacion') appConfirmacion: ConfirmacionComponent;
  
  tiposImpuesto:TipoImpuesto[];
  impuestos:Impuestos;
  impuestosUsuario:Impuestos[];
  mostrarNotificacion:boolean;
  mensajeNotificacion:string;
  mostrarMensajeError:boolean;
  mensajeError:string;
  idEliminar:number;


  
  ///Obtiene los usuarios del servicio y lo asigna en el arreglo
  cargarTipoImpuesto(): void {
      ///Manda llamar al servicio apra obtener los chats
      this.tipoImpuestoService.cargar().subscribe(result => {
      
        if(result != null){
          this.tiposImpuesto = result;
          setTimeout(()=>{    
            ///Selecciona el primer elemento de la lista
            if(this.selTipoImpuesto != undefined && this.selTipoImpuesto.first != undefined){
              this.impuestos.tipoImpuesto_id = this.selTipoImpuesto.first.nativeElement.children[0].value;
            }
          }, 500);
        }
      },
      error=>{
      
      });
    }


    
  ///Obtiene los usuarios del servicio y lo asigna en el arreglo
  cargarImpuestos(): void {
    ///Manda llamar al servicio para obtener los impuestos
    this.impuestosService.cargar().subscribe(result => {
    
      if(result != null){

        this.impuestosUsuario = result;
      }
    },
    error=>{
    
    });
  }

    agregar():void{

      this.mostrarNotificacion = false;
      this.mostrarMensajeError = false;
      if(this.impuestos.id ==  undefined || this.impuestos.id == 0){
          this.impuestosService.agregar(this.impuestos).subscribe(result => {
            if(result != null){
              this.mensajeNotificacion = 'Impuesto ' + this.impuestos.nombre + ' agregado correctamente';
              this.mostrarNotificacion = true;
              this.limpiar();
              ///Agrega el elemento devuelto en la primera posicion
              this.impuestosUsuario.unshift(result);
            }
          },
          error=>{
          
          });
      }
      else{
        this.impuestosService.actualizar(this.impuestos, this.impuestos.id).subscribe(result => {
          if(result != null ){
            if(result.status != undefined && result.status != 200){
              this.mensajeError = 'Ocurrio un error en la petición';
              this.mostrarMensajeError = true;
            }else{
              this.mensajeNotificacion = 'Se edito el impuesto ' + this.impuestos.nombre;
              this.mostrarNotificacion = true;
              this.limpiar();
              this.cargarImpuestos();
            }
          }
        },
        error=>{
        
        });
      }

    }

    limpiar():void{
      this.impuestos = new  Impuestos();
      
      
      if(this.selTipoImpuesto != undefined && this.selTipoImpuesto.first != undefined){
        this.impuestos.tipoImpuesto_id = this.selTipoImpuesto.first.nativeElement.children[0].value;
      }
      
    }

    editar(id) :void{

      this.impuestosService.cargarXId(id).subscribe(result => {
    
        if(result != null){
  
          this.impuestos = result;
          
        }
      },
      error=>{
      
      });
    }


    eliminar() :void{

      this.impuestosService.eliminar(this.idEliminar).subscribe(result => {
    
        if(result != null){
  
          ///Carga los impuestos
          this.cargarImpuestos();
          ///CIerra la confirmacion
          this.appConfirmacion.ocultar();
          ///Mostrar mensaje
          this.mensajeNotificacion = 'Impuesto ' + result.nombre+ ' eliminado correctamente';
          this.mostrarNotificacion = true;
          
        }
      },
      error=>{
      
      });
    }

    confirmar(id){
       this.idEliminar = id;
       this.appConfirmacion.mostrar();

    }


    closeAlert() {
      this.mostrarNotificacion = false;
      this.mostrarMensajeError = false;
    }
  
}
