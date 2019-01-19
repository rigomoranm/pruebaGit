import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/shared/models/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  constructor(
    private router: Router,
    private usuarioService:UsuarioService  ) {
    this.usuario = new Usuario();
   }
   usuario:Usuario;
   error:boolean=false;
   mensajeError:string;

  ngOnInit() {
  
  }
  
  registro(): void{
      this.error = false;
    this.usuarioService.registro(this.usuario).subscribe(result => {
      
        ///Si el mensaje trae algo entonces el servidor devolvio un error http
        if(result.message){
          this.error= true;
          switch(result.message){
              case 'unique_email_restrinccion':
                this.mensajeError = "El email ya se encuentra registrado";
              break;
              case 'input_no_valid':
                this.mensajeError = "No se enviaron los campos requeridos";
              break;
          }

        }
        else{
          this.router.navigate(['/user']);    
        }
      },
      error=>{
        this.error = true;
      
      });

    
  }

}
