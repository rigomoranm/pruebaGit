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
  UserLayoutComponent
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
import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './views/home/home.component';
import { UserLayoutComponent } from '../containers/user-layout/user-layout.component';
import { CuentaComponent } from './views/cuenta/cuenta.component';
import { ContrasenaComponent } from './views/contrasena/contrasena.component';
import { ConfiguracionComponent } from './views/configuracion/configuracion.component';
import { PrefGeneralesComponent } from './views/pref-generales/pref-generales.component';
import { ImpuestosComponent } from './views/impuestos/impuestos.component';
import { RetencionesComponent } from './views/retenciones/retenciones.component';
import { TerPagoComponent } from './views/ter-pago/ter-pago.component';
import { PlanesComponent } from './views/planes/planes.component';
import { FormsModule } from '@angular/forms';
import { ConfirmacionComponent } from './components/confirmacion/confirmacion.component';
import { StatsCardComponent } from '../components/stats-card/stats-card.component';
import { MatDialogModule } from '@angular/material';
import { ModalModule } from 'ngx-bootstrap';


@NgModule({
  imports: [
    FormsModule,
    UserRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    ModalModule
  ],
  declarations: [
    // AppComponent,
    ...APP_CONTAINERS,
    HomeComponent, 
    CuentaComponent,
    ContrasenaComponent,
    ConfiguracionComponent,
    PrefGeneralesComponent,
    ImpuestosComponent,
    RetencionesComponent,
    TerPagoComponent,
    PlanesComponent,
    ConfirmacionComponent,
    StatsCardComponent
    
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  entryComponents: [ConfirmacionComponent]
  // bootstrap: [ AppComponent ]
})

export class UserPanelModule { }
