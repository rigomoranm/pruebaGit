import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { RegistroComponent } from './views/registro/registro.component';


const routes: Routes = [
  
  { 
    path: '',
    redirectTo: '/login', 
    pathMatch: 'full' 
  },
  { 
      path: 'login', component: LoginComponent },
  { 
      path: 'registro', component: RegistroComponent },
  {
    path: 'admin',
    loadChildren: './admin-panel/admin-panel.module#AdminPanelModule'
  },
  {
    path: 'user',
    loadChildren: './user-panel/user-panel.module#UserPanelModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
