import { Injectable } from '@angular/core';
import {Retenciones} from '../shared/models/retenciones'
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RetencionesService {
  
  constructor(private http: HttpClient) { }

  ///Realiza la peticion para agregar la retencion
  agregar(objRetenciones:Retenciones): Observable<any>{
    return this.http.post<any>(environment.apiUrl+ '/retenciones', objRetenciones).pipe(
      catchError(this.handleError('guadarImp', null))
    );

  }
  ///Actualiza la configuracion de la retencion
  actualizar(objRetenciones:Retenciones, id:number): Observable<any>{
    return this.http.put<any>(environment.apiUrl+ '/retenciones/'+id, objRetenciones).pipe(
      catchError(this.handleError('actualizarImp', null))
    );

  }

  ///elimian  la retencion
  eliminar(id:number): Observable<any>{
    return this.http.delete<any>(environment.apiUrl+ '/retenciones/delete/' + id).pipe(
      catchError(this.handleError('eliminarImp', null))
    );

  }
  
///Carga los Retenciones agregados por el usuario
cargar(): Observable<Retenciones[]>{
  
  return this.http.get<Retenciones[]>(environment.apiUrl+ '/retenciones').pipe(
      catchError(this.handleError('cargarConf', null))
    );
  }
///Carga la retencion a editar
cargarXId(id): Observable<Retenciones>{
  
  return this.http.get<Retenciones[]>(environment.apiUrl+ '/retenciones/' + id).pipe(
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
