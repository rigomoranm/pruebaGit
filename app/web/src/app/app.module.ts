import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//Modulo para cargar el diseño de mdbbootstrap

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth.guard';

import { RegistroComponent } from './views/registro/registro.component';


import { StorageService } from './shared/helpers/storage.service';
import { JwtInterceptor } from './shared/helpers/JwtInterceptor';
import { LoginComponent } from './views/login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
    ],
  providers: [
    AuthGuard,
    StorageService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  exports: [FormsModule]
})
export class AppModule { }
