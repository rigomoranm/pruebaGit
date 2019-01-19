import { Injectable } from '@angular/core';
import {Usuario} from '../shared/models/usuario'
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { StorageService } from '../shared/helpers/storage.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  
  constructor(private http: HttpClient,
    private storageService: StorageService) { }

 
 ///Realiza el registro del usaurio
 registro(objUsuario:Usuario): Observable<any>{

  ///Realiza la peticion al servidor para registrar el usuario
  return this.http.post<any>(environment.apiUrl+ '/usuarios', objUsuario)
    .pipe(tap(result => {
      if(result)
          {
            ///Guarda el usuario en local storage
            this.storageService.saveObject('usuarioActual', result.user);
            //Guarda el token en local storage
            this.storageService.saveObject('token', result.token);
          }
          return result;
      }),
      catchError(this.handleError('usuarios', null))
    );
  }

  ///realiza el cambio del nombre del usuario
  cambiarNombre(objUsuario:Usuario): Observable<any>{

    ///Realiza la peticion al servidor
    return this.http.post<any>(environment.apiUrl+ '/cambiarNombre', objUsuario) .pipe(tap(result => {
      
      //Obtiene el objeto del storage
      let usuario =    this.storageService.getObject('usuarioActual');
      //Modifica los datos de nombre y apellidos
      usuario.nombre = objUsuario.nombre;
      usuario.apellidos = objUsuario.apellidos;
      //Guarda el objeto en el storage
      this.storageService.saveObject('usuarioActual', usuario);

      }),
      catchError(this.handleError('usuarios', null))
    );

    }

    cambiarPass(objUsuario:Usuario): Observable<any>{

      ///Realiza la peticion al servidor para validar el usuario
      return this.http.post<any>(environment.apiUrl+ '/cambiarPass', objUsuario)
      .pipe(tap(result => {
      
  
  
        }),
        catchError(this.handleError('usuarios', null))
      );
  
    }
    

  ///Realiza la validacion del usaurio
login(objUsuario:Usuario): Observable<any>{
  ///Realiza la peticion al servidor para validar el usuario
  return this.http.post<any>(environment.apiUrl+ '/login', objUsuario)
    .pipe(
      tap(result => {
      if(result)
          {
            ///Guarda el usuario en local storage
            this.storageService.saveObject('usuarioActual', result.user);
            //Guarda el token en local storage
            this.storageService.saveObject('token', result.token);
          }
          return result;
      }),
      catchError(this.handleError('login', null))
    );
}

///Funcion para borrar del local storage el objeto del usuario
logout(): void{
  
  this.storageService.removeStorage('usuarioActual');
  this.storageService.removeStorage('token');
}


/**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      ///Genera un objeto de error para regresarlo
      let resultError:any;
      resultError = {
        status: error.status,
        statusText: error.statusText,
        message: error.error.error
      };

      // Let the app keep running by returning an empty result.
      return of(resultError as T);
    };
  }


}
