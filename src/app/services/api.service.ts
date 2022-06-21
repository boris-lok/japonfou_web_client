import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {env} from "../../env/env";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private httpClient: HttpClient
  ) {
  }

  private formatError(error: any) {
    return throwError(error.error);
  }

  get = (path: string, params: HttpParams = new HttpParams()): Observable<any> => {
    return this.httpClient
      .get(`${env.api_url}${path}`, {params})
      .pipe(catchError(this.formatError))
  }

  put = (path: string, body: Object = {}): Observable<any> => {
    return this.httpClient
      .put(`${env.api_url}${path}`, JSON.stringify(body))
      .pipe(catchError(this.formatError))
  }

  post = (path: string, body: Object = {}): Observable<any> => {
    return this.httpClient
      .post(`${env.api_url}${path}`, JSON.stringify(body))
      .pipe(catchError(this.formatError))
  }

  delete = (path: string): Observable<any> => {
    return this.httpClient
      .delete(`${env.api_url}`)
      .pipe(catchError(this.formatError))
  }
}