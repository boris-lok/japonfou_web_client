import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Credentials': 'true',
  });

  constructor(
    private httpClient: HttpClient
  ) {

  }

  private formatError(error: HttpErrorResponse) {
    console.log(error.message);
    return throwError(error.error);
  }

  get = (path: string, params: HttpParams = new HttpParams()): Observable<any> => {
    return this.httpClient
      .get(
        `${environment.api_url}${path}`,
        {params, headers: this.headers}
      )
      .pipe(catchError(this.formatError))
  }

  put = (path: string, body: Object = {}): Observable<any> => {
    return this.httpClient
      .put(
        `${environment.api_url}${path}`,
        JSON.stringify(body),
        {headers: this.headers}
      )
      .pipe(catchError(this.formatError))
  }

  post = (path: string, body: Object = {}): Observable<any> => {
    return this.httpClient
      .post(
        `${environment.api_url}${path}`,
        JSON.stringify(body),
        {headers: this.headers}
      )
      .pipe(catchError(this.formatError))
  }

  delete = (path: string): Observable<any> => {
    return this.httpClient
      .delete(
        `${environment.api_url}`,
        {headers: this.headers}
      )
      .pipe(catchError(this.formatError))
  }
}
