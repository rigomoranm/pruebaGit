import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/shared/models/Usuario';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.usuario = new Usuario();
  }
  usuario:Usuario;
  error:boolean=false;

  login(): void{
  
        this.router.navigateByUrl('/admin/paquetes');
  }
}
