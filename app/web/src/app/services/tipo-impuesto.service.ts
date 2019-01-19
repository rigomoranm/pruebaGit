import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { TipoImpuesto } from '../shared/models/tipoImpuesto';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TipoImpuestoService {

  constructor(private http: HttpClient) { }



///Carga el tipo de impuesto
cargar(): Observable<TipoImpuesto[]>{
  
  return this.http.get<TipoImpuesto[]>(environment.apiUrl+ '/tipoImpuesto').pipe(
      catchError(this.handleError('tipoImpuesto', null))
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
