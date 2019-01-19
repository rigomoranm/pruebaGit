import { Injectable } from '@angular/core';
import {Impuestos} from '../shared/models/impuestos'
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImpuestosService {

  
  constructor(private http: HttpClient) { }

  

  ///Realiza la peticion para agregar el impuesto
  agregar(objImpuestos:Impuestos): Observable<any>{
    return this.http.post<any>(environment.apiUrl+ '/impuestos', objImpuestos).pipe(
      catchError(this.handleError('guadarImp', null))
    );

  }

  ///Actualiza la configuracion del impuesto
  actualizar(objImpuestos:Impuestos, id:number): Observable<any>{
    return this.http.put<any>(environment.apiUrl+ '/impuestos/'+id, objImpuestos).pipe(
      catchError(this.handleError('actualizarImp', null))
    );

  }

  ///elimina el impuesto
  eliminar(id:number): Observable<any>{
    return this.http.delete<any>(environment.apiUrl+ '/impuestos/delete/' + id).pipe(
      catchError(this.handleError('eliminarImp', null))
    );

  }
  
///Carga los impuestos agregados por el usuario
cargar(): Observable<Impuestos[]>{
  
  return this.http.get<Impuestos[]>(environment.apiUrl+ '/impuestos').pipe(
      catchError(this.handleError('cargarConf', null))
    );
  }
///Carga el impuesto a editar
cargarXId(id): Observable<Impuestos>{
  
  return this.http.get<Impuestos[]>(environment.apiUrl+ '/impuestos/' + id).pipe(
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
