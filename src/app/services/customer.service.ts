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
    const c = {
      id: id,
      name: 'boris',
      email: 'boris@gmail.com',
      phone: '123',
      created_at: 12312313,
    } as ICustomer

    return of(c)
    // let params = new HttpParams({fromObject: {id: id}})
    // return this.apiService
    //   .get('/v1/customer', params)
  }

  save = (customer: ICustomer): Observable<ICustomer> => {
    // update customer when customer id isn't nullable.
    if (customer.id) {
      console.log(`update customer`);
      // return this.apiService
      //   .put('/v1/customers', customer);
    } else {
      console.log(`create customer`);
    }

    return of(customer)
  }
}
