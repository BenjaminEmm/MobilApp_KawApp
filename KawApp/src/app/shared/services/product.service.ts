import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { Observable, catchError, map } from 'rxjs';
import { ProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private errorService: ErrorService,
    private httpClient: HttpClient,
  ) { }

  getAll(customerId: number, orderId: number): Observable<ProductModel[]> {
    return this.httpClient.get<ProductModel[]>(`${env}/customers/${customerId}/orders/${orderId}/products/`)
      .pipe(
        map((response: any) => response.map((product: any) => new ProductModel(product))),
        catchError(this.errorService.handleError('/customers/:customer_id/orders/:order_id/products/', []))
      );
  }

  getById(customerId: number, orderId: number, productId: number): Observable<ProductModel> {
    return this.httpClient.get<ProductModel>(`${env}/customers/${customerId}/orders/${orderId}/products/${productId}`)
      .pipe(
        map((response: any) => new ProductModel(response)),
        catchError(this.errorService.handleError('/customers/:customer_id/orders/:order_id/products/:product_id', new ProductModel()))
      )
  }
}
