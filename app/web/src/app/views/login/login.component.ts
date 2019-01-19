import { Component, OnInit , Input } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/shared/models/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private usuarioService:UsuarioService  ) {
    this.usuario = new Usuario();


   }

  usuario:Usuario;
  error:boolean=false;
  ngOnInit() {
  }


  login(): void{
    this.error = false;
    this.usuarioService.login(this.usuario)
      .subscribe(result => {
        
        if(!result.message && result.user.id != 0) this.router.navigateByUrl('/user');//navigate(['/user']);    
        else this.error= true;

      },
      error=>{
        this.error = true;
      });

    
  }


}
