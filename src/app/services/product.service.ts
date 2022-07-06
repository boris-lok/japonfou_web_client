import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {HttpParams} from "@angular/common/http";
import {IProduct} from "../models/product.class";
import {Observable} from "rxjs";
import {IPagination} from "../models/pagination.class";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private apiService: ApiService) {
  }

  get = (id: number) => {
    let params = new HttpParams({fromObject: {id: id}})
    return this.apiService
      .get('/v1/products', params)
  }

  save = (product: IProduct): Observable<IProduct> => {
    if (product.id) {
      return this.apiService
        .put('/v1/products', product);
    } else {
      return this.apiService
        .post('/v1/products', product);
    }
  }

  getProducts = (data: IPagination): Observable<IProduct[]> => {
    let params = new HttpParams({
      fromObject: {
        ...data.keyword && {query: data.keyword},
        'page': data.page,
        'page_size': data.page_size,
      }
    });

    return this.apiService
      .get('/v1/products', params)
  }
}
