import { Component, OnInit , Input  } from '@angular/core';
import { Usuario } from 'src/app/shared/models/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { StorageService } from 'src/app/shared/helpers/storage.service';

@Component({
  selector: 'app-contrasena',
  templateUrl: './contrasena.component.html',
  styleUrls: ['./contrasena.component.scss']
})
export class ContrasenaComponent implements OnInit {

 
  constructor(
    private storageService: StorageService,
    private usuarioService:UsuarioService  ) {
    this.usuario = new Usuario();
   }
   usuario:Usuario;
   mostrarNotificacion:boolean;

  ngOnInit() {
  }

  cambiarPass():void{
    this.mostrarNotificacion = false;
    this.usuarioService.cambiarPass(this.usuario).subscribe(result => {
      this.mostrarNotificacion = true;
      this.usuario.confirmarPassword = "";
      this.usuario.password = "";
    },
    error=>{
    
    });
   
  }

  closeAlert() {
    this.mostrarNotificacion = false;
  }

}
