import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { Observable, catchError, map, tap } from 'rxjs';
import { ProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private errorService: ErrorService,
    private httpClient: HttpClient,
  ) { }

  create(data: ProductModel): Observable<ProductModel> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(data);
    const options = { headers };
    return this.httpClient.post<ProductModel>(`${env.uri.api.erp}/Produits`, body, options)
      .pipe(
        map(res => new ProductModel(res)),
        catchError(this.errorService.handleError('create product', data))
      );
  }

  getAll(): Observable<ProductModel[]> {
    return this.httpClient.get<ProductModel[]>(`${env.uri.api.erp}/Produits`)
      .pipe(
        map((res) => res.map((product: any) => new ProductModel(product))),
        catchError(this.errorService.handleError('get all products', []))
      );
  }

  getById(id: number): Observable<ProductModel> {
    return this.httpClient.get<ProductModel>(`${env.uri.api.erp}/Produits/${id}`)
      .pipe(
        map(res => new ProductModel(res)),
        catchError(this.errorService.handleError('get product by id', new ProductModel({ id })))
      )
  }

  getAllByOrderId(customerId: number, orderId: number): Observable<any> {
    return this.httpClient.get<any>(`https://615f5fb4f7254d0017068109.mockapi.io/api/v1/customers/${customerId}/orders/${orderId}/products`)
  }

  updateById(id: number, data: ProductModel): Observable<ProductModel> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(data);
    const options = { headers };
    return this.httpClient.put<ProductModel>(`${env.uri.api.erp}/Produits/${id}`, body, options)
      .pipe(
        map(res => new ProductModel(res)),
        catchError(this.errorService.handleError('update product by id', data))
      )
  }

  public deleteById(id: number): Observable<number> {
    return this.httpClient.delete<any>(`${env.uri.api.erp}/Produits/${id}`)
      .pipe(
        map((res: any) => id),
        catchError(this.errorService.handleError('delete product by id', id))
      )
  }
}
