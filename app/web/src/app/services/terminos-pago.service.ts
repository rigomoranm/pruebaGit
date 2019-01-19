import { Injectable } from '@angular/core';
import {TerminosPago} from '../shared/models/terminosPago'
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TerminosPagoService {

  constructor(private http: HttpClient) { }


  ///Realiza la peticion para agregar el TerminosPago
  agregar(objTerminosPago:TerminosPago): Observable<any>{
    return this.http.post<any>(environment.apiUrl+ '/terminosPago', objTerminosPago).pipe(
      catchError(this.handleError('guadarTerminosPago', null))
    );

  }
  ///Actualiza la configuracion del TerminosPago
  actualizar(objTerminosPago:TerminosPago, id:number): Observable<any>{
    return this.http.put<any>(environment.apiUrl+ '/terminosPago/'+id, objTerminosPago).pipe(
      catchError(this.handleError('actualizarTerminosPago', null))
    );

  }

    ///Actualiza el estatus del TerminosPago
    actualizarEstatus(objTerminosPago:TerminosPago, id:number): Observable<any>{
      return this.http.put<any>(environment.apiUrl+ '/terminosPago/status/'+id, objTerminosPago).pipe(
        catchError(this.handleError('actualizarEstatus', null))
      );
  
    }

  ///elimina la configuracion del TerminosPago
  eliminar(id:number): Observable<any>{
    return this.http.delete<any>(environment.apiUrl+ '/terminosPago/delete/' + id).pipe(
      catchError(this.handleError('eliminarTerminosPago', null))
    );

  }
  
///Carga los TerminosPago agregados por el usuario
cargar(): Observable<TerminosPago[]>{
  
  return this.http.get<TerminosPago[]>(environment.apiUrl+ '/terminosPago').pipe(
      catchError(this.handleError('cargarTerminosPago', null))
    );
  }
///Carga el TerminosPago a editar
cargarXId(id): Observable<TerminosPago>{
  
  return this.http.get<TerminosPago[]>(environment.apiUrl+ '/terminosPago/' + id).pipe(
      catchError(this.handleError('cargarTerminosPago', null))
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
