import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};



// Import containers


const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from '../app-routing.module';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { PaquetesComponent } from './views/paquetes/paquetes.component';
import { PagosComponent } from './views/pagos/pagos.component';
import { UsuariosComponent } from './views/usuarios/usuarios.component';
import { PaqueteComponent } from './views/paquete/paquete.component';
import { UsuarioComponent } from './views/usuario/usuario.component';
import { PagoUsuarioComponent } from './views/pago-usuario/pago-usuario.component';
import { DefaultLayoutComponent } from '../containers';
import { AdminRoutingModule } from './admin-routing.module';
import { LoginAdminComponent } from './views/login-admin/login-admin.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    AdminRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule
  ],
  declarations: [
    // AppComponent,
    ...APP_CONTAINERS,
    PaquetesComponent,
    PagosComponent,
    UsuariosComponent,
    PaqueteComponent,
    UsuarioComponent,
    PagoUsuarioComponent,
    LoginAdminComponent
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }]
  // bootstrap: [ AppComponent ]
})

export class AdminPanelModule { }
