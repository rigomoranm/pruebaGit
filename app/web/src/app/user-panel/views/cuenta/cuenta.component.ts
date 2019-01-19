import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/shared/models/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { StorageService } from 'src/app/shared/helpers/storage.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss']
})
export class CuentaComponent implements OnInit {

  constructor(
    private storageService: StorageService,
    private usuarioService:UsuarioService  ) {
    this.usuario = new Usuario();
   }
   usuario:Usuario;
   mostrarNotificacion:boolean;
   
  ngOnInit() {
    this.usuario =    this.storageService.getObject('usuarioActual');
  }
  
  cambiarNombre():void{
    this.mostrarNotificacion = false;
    this.usuarioService.cambiarNombre(this.usuario).subscribe(result => {
      this.mostrarNotificacion = true;
      },
      error=>{
      
      });

    
  }
  
  closeAlert() {
    this.mostrarNotificacion = false;
  }


}
