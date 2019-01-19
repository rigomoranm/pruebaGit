import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { TipoRetencion } from 'src/app/shared/models/tipoRetencion';
import { TipoRetencionService } from 'src/app/services/tipo-retencion.service';
import { Retenciones } from 'src/app/shared/models/retenciones';
import { RetencionesService } from 'src/app/services/retenciones.service';
import { ConfirmacionComponent } from '../../components/confirmacion/confirmacion.component';



@Component({
  selector: 'app-retenciones',
  templateUrl: './retenciones.component.html',
  styleUrls: ['./retenciones.component.scss']
})
export class RetencionesComponent implements OnInit {

  constructor(
    private tipoRetencionService:TipoRetencionService,
    private retencionesService:RetencionesService
  ) { }

  
  ngOnInit() {
    this.cargarTipoRetencion();
    this.retenciones = new Retenciones();

    
    //Carga la lista de retenciones del usuario
    this.cargarRetenciones();
  
    ///Se subscribe al evento que indica que se acepto la confirmacion
    this.appConfirmacion.evtConfirmacionAceptar.subscribe(result=>{
      ///Elimina el id seleccionado
      this.eliminar();
    });
  }
  @ViewChildren('selTipoRetencion') selTipoImpuesto;
  @ViewChild('appConfirmacion') appConfirmacion: ConfirmacionComponent;
  
  tiposRetenciones:TipoRetencion[];
  retenciones:Retenciones;
  retencionesUsuario:Retenciones[];
  mostrarNotificacion:boolean;
  mensajeNotificacion:string;
  mostrarMensajeError:boolean;
  mensajeError:string;
  idEliminar:number;



    
  ///Obtiene los usuarios del servicio y lo asigna en el arreglo
  cargarTipoRetencion(): void {
    ///Manda llamar al servicio apra obtener los chats
    this.tipoRetencionService.cargar().subscribe(result => {
    
      if(result != null){
        this.tiposRetenciones = result;
        setTimeout(()=>{    
          ///Selecciona el primer elemento de la lista
          if(this.selTipoImpuesto != undefined && this.selTipoImpuesto.first != undefined){
            this.retenciones.tipoRetencion_id = this.selTipoImpuesto.first.nativeElement.children[0].value;
          }
        }, 500);
      }
    },
    error=>{
    
    });
  }

    
  ///Obtiene los usuarios del servicio y lo asigna en el arreglo
  cargarRetenciones(): void {
    ///Manda llamar al servicio para obtener los impuestos
    this.retencionesService.cargar().subscribe(result => {
    
      if(result != null){

        this.retencionesUsuario = result;
      }
    },
    error=>{
    
    });
  }

  agregar():void{

    this.mostrarNotificacion = false;
    this.mostrarMensajeError = false;
    if(this.retenciones.id ==  undefined || this.retenciones.id == 0){
        this.retencionesService.agregar(this.retenciones).subscribe(result => {
          if(result != null){
            this.mensajeNotificacion = 'Retencion ' + this.retenciones.nombre + ' agregada correctamente';
            this.mostrarNotificacion = true;
            this.limpiar();
            ///Agrega el elemento devuelto en la primera posicion
            this.retencionesUsuario.unshift(result);
          }
        },
        error=>{
        
        });
    }
    else{
      this.retencionesService.actualizar(this.retenciones, this.retenciones.id).subscribe(result => {
        if(result != null ){
          if(result.status != undefined && result.status != 200){
            this.mensajeError = 'Ocurrio un error en la petición';
            this.mostrarMensajeError = true;
          }else{
            this.mensajeNotificacion = 'Se edito el impuesto ' + this.retenciones.nombre;
            this.mostrarNotificacion = true;
            this.limpiar();
            this.cargarRetenciones();
          }
        }
      },
      error=>{
      
      });
    }

  }


  limpiar():void{
    this.retenciones = new  Retenciones();
    
    
    if(this.selTipoImpuesto != undefined && this.selTipoImpuesto.first != undefined){
      this.retenciones.tipoRetencion_id = this.selTipoImpuesto.first.nativeElement.children[0].value;
    }
    
  }



  
  editar(id) :void{

    this.retencionesService.cargarXId(id).subscribe(result => {
  
      if(result != null){

        this.retenciones = result;
        
      }
    },
    error=>{
    
    });
  }


  eliminar() :void{

    this.retencionesService.eliminar(this.idEliminar).subscribe(result => {
  
      if(result != null){

        ///Carga los impuestos
        this.cargarRetenciones();
        ///CIerra la confirmacion
        this.appConfirmacion.ocultar();
        ///Mostrar mensaje
        this.mensajeNotificacion = 'Retencion ' + result.nombre+ ' eliminada correctamente';
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
