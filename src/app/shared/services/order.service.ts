import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { OrderModel } from '../models/order.model';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private errorService: ErrorService,
    private httpClient: HttpClient,
  ) { }

  public getAll(customerId: number): Observable<OrderModel[]> {
    return this.httpClient.get<OrderModel[]>(`${env.uri}/customers/${customerId}/orders/`)
      .pipe(
        map((response: any) => response.map((order: any) => new OrderModel(order))),
        catchError(this.errorService.handleError('/orders/:id/', []))
      )
  }

  public getById(customerId: number, orderId: number): Observable<OrderModel> {
    return this.httpClient.get<OrderModel>(`${env.uri}/customers/${customerId}/orders/${orderId}/`)
      .pipe(
        map((response: any) => new OrderModel(response)),
        catchError(this.errorService.handleError('/customers/:customer_id/orders/:order_id/', new OrderModel()))
      )
  }
}
