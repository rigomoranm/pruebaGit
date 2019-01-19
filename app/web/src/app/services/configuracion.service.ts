import { Injectable } from '@angular/core';
import {Configuracion} from '../shared/models/configuracion'
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  constructor(private http: HttpClient) { }

  

  ///Realiza la peticion para agregar o editar la configuracion
  guardar(objConf:Configuracion): Observable<any>{
    return this.http.post<any>(environment.apiUrl+ '/configuracion', objConf).pipe(
      catchError(this.handleError('guadarConf', null))
    );

  }
  
///Carga la configuracion del usuario
cargar(): Observable<Configuracion>{
  ///realiza conexion al servidor para cargar la configuracion
  return this.http.get<Configuracion>(environment.apiUrl+ '/configuracion').pipe(
      catchError(this.handleError('cargarConf', null))
    );
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
