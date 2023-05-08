import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  public create(data: OrderModel): Observable<OrderModel> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(data);
    const options = { headers };

    return this.httpClient.post<OrderModel>(`${env.uri.api.erp}/Commandes`, body, options)
      .pipe(
        map((response: any) => new OrderModel(response)),
        catchError(this.errorService.handleError('create order', data))
      );
  }

  public getAll(): Observable<OrderModel[]> {
    return this.httpClient.get<OrderModel[]>(`${env.uri.api.erp}/Commandes`)
      .pipe(
        map((response: any) => response.map((order: any) => new OrderModel(order))),
        catchError(this.errorService.handleError('get all orders', []))
      )
  }

  public getById(id: number): Observable<OrderModel> {
    return this.httpClient.get<OrderModel>(`${env.uri.api.erp}/Commandes/${id}`)
      .pipe(
        map((response: any) => new OrderModel(response)),
        catchError(this.errorService.handleError('get order by id', new OrderModel({ id })))
      )
  }

  public updateById(id: number, data: OrderModel): Observable<OrderModel> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(data);
    const options = { headers };

    return this.httpClient.put<OrderModel>(`${env.uri.api.erp}/Commandes/${id}`, body, options)
      .pipe(
        map((response: any) => new OrderModel(response)),
        catchError(this.errorService.handleError('update order by id', data))
      );
  }

  public deleteById(id: number): Observable<number> {
    return this.httpClient.delete<any>(`${env.uri.api.erp}/Commandes/${id}`)
      .pipe(
        map((res: any) => id),
        catchError(this.errorService.handleError('delete order by id', id))
      )
  }
}
