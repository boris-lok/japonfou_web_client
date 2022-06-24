import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {ICustomer} from "../models/customer.class";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private apiService: ApiService) {
  }

  get = (id: number): Observable<ICustomer> => {
    let params = new HttpParams({fromObject: {id: id}})
    return this.apiService
      .get('/v1/customers', params)
  }

  save = (customer: ICustomer): Observable<ICustomer> => {
    // update customer when customer id isn't nullable.
    if (customer.id) {
      return this.apiService
        .put('/v1/customers', customer);
    } else {
      return this.apiService
        .post('/v1/customers', customer);
    }
  }

  getAllCustomers = (keyword: string | null, page: number, page_size: number): Observable<ICustomer[]> => {
    let params = new HttpParams({
      fromObject: {
        ...keyword && {query: keyword},
        'page': page,
        'page_size': page_size,
      }
    });

    return this.apiService
      .get('/v1/customers', params)
  }
}
