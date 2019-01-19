import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLayoutComponent } from '../containers/user-layout/user-layout.component';
import { AuthGuard } from '../auth.guard';

import { HomeComponent } from './views/home/home.component';
import { CuentaComponent } from './views/cuenta/cuenta.component';
import { ContrasenaComponent } from './views/contrasena/contrasena.component';
import { ConfiguracionComponent } from './views/configuracion/configuracion.component';
import { PrefGeneralesComponent } from './views/pref-generales/pref-generales.component';
import { ImpuestosComponent } from './views/impuestos/impuestos.component';
import { RetencionesComponent } from './views/retenciones/retenciones.component';
import { TerPagoComponent } from './views/ter-pago/ter-pago.component';
import { PlanesComponent } from './views/planes/planes.component';



const routes: Routes = [
    { 
    path: '',
    redirectTo: 'inicio', 
    pathMatch: 'full' 
  },
  {
    path: '',
    // canActivate: [AuthGuard],
    component: UserLayoutComponent,
    data: {
      title: 'user'
    },
    children:[
        {
          path:'inicio',
          component:HomeComponent
        },
        {
          path:'cuenta',
          component:CuentaComponent
        },
        {
          path:'contrasena',
          component:ContrasenaComponent
        },
        {
          path:'configuracion',
          component:ConfiguracionComponent
        },
        {
          path:'pref-generales',
          component:PrefGeneralesComponent
        },
        {
          path:'impuestos',
          component:ImpuestosComponent
        },
        {
          path:'retenciones',
          component:RetencionesComponent
        },
        {
          path:'ter-pago',
          component:TerPagoComponent
        },
        {
          path:'planes',
          component:PlanesComponent
        }
    ]
}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
