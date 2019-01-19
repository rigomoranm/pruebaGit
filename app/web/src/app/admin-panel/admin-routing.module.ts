import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { PaquetesComponent } from './views/paquetes/paquetes.component';
import { PaqueteComponent } from './views/paquete/paquete.component';
import { UsuariosComponent } from './views/usuarios/usuarios.component';
import { UsuarioComponent } from './views/usuario/usuario.component';
import { PagosComponent } from './views/pagos/pagos.component';
import { PagoUsuarioComponent } from './views/pago-usuario/pago-usuario.component';
import { DefaultLayoutComponent } from '../containers/default-layout/default-layout.component';
import { LoginAdminComponent } from './views/login-admin/login-admin.component';

const routes: Routes = [
    { 
    path: '',
    redirectTo: 'login', 
    pathMatch: 'full' 
  },
  { 
    path: 'login',
    component:LoginAdminComponent
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'admin'
    },
    children: [
  
      {
          path: 'paquetes',
          component:PaquetesComponent
        },
        {
          path: 'paquete',
          component:PaqueteComponent
        },
        {
          path: 'usuarios',
          component:UsuariosComponent
        },
        {
          path: 'usuario',
          component:UsuarioComponent
        },
        {
          path: 'pagos',
          component:PagosComponent
        },
        {
          path: 'historico-pagos',
          component:PagoUsuarioComponent
        }
    ]
}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
