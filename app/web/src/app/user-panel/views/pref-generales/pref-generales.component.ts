import { Component,  OnInit , Input  } from '@angular/core';
import { Configuracion } from 'src/app/shared/models/Configuracion';
import { ConfiguracionService } from 'src/app/services/configuracion.service';

@Component({
  selector: 'app-pref-generales',
  templateUrl: './pref-generales.component.html',
  styleUrls: ['./pref-generales.component.scss']
})
export class PrefGeneralesComponent implements OnInit {

  constructor(private configuracionService:ConfiguracionService ) { }

  conf:Configuracion;
  mostrarNotificacion:boolean;
  ngOnInit() {
    ///realiza la peticion pata obtener la configuraicon actual al inicio
    this.conf = new Configuracion();
    ///Asigna valores default
    this.conf.formatoFecha = 'dd-mm-yyyy';
    this.conf.numDecimales = 2;
    ///Carga configuracion
    this.cargarConf();
  }

  cargarConf():void{
    this.configuracionService.cargar().subscribe(result => {
      
      if(result != null){
        this.conf = result;
      }
    },
    error=>{
    
    });
  }

  guardar():void{
    this.mostrarNotificacion = false;
    this.configuracionService.guardar(this.conf).subscribe(result => {
      
      if(result != null){
        this.mostrarNotificacion = true;
      }
    },
    error=>{
    
    });
  }

  closeAlert() {
    this.mostrarNotificacion = false;
  }

}
