import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';
import { CustomerModel } from '../models/customer.model';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private errorService: ErrorService,
    private httpClient: HttpClient,
  ) { }

  create(data: CustomerModel): Observable<CustomerModel> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(data);
    const options = { headers };
    return this.httpClient.post<CustomerModel>(`${env.uri.api.crm}/Clients`, body, options)
      .pipe(
        map(res => new CustomerModel(res)),
        catchError(this.errorService.handleError('create customer', data))
      );
  }

  getAll(): Observable<CustomerModel[]> {
    return this.httpClient.get<CustomerModel[]>(`${env.uri.api.crm}/Clients`)
      .pipe(
        map((res) => res.map((customer: any) => new CustomerModel(customer))),
        catchError(this.errorService.handleError('get all customers', []))
      );
  }

  getById(id: number): Observable<CustomerModel> {
    return this.httpClient.get<CustomerModel>(`${env.uri.api.crm}/Clients/${id}`)
      .pipe(
        map(res => new CustomerModel(res)),
        catchError(this.errorService.handleError('get customer by id', new CustomerModel({ id })))
      )
  }

  updateById(id: number, data: CustomerModel): Observable<CustomerModel> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(data);
    const options = { headers };
    return this.httpClient.put<CustomerModel>(`${env.uri.api.crm}/Clients`, body, options)
      .pipe(
        map(res => new CustomerModel(res)),
        catchError(this.errorService.handleError('update customer by id', data))
      )
  }

  public deleteById(id: number): Observable<number> {
    return this.httpClient.delete<any>(`${env.uri.api.crm}/Clients/${id}`)
      .pipe(
        map((res: any) => id),
        catchError(this.errorService.handleError('delete customer by id', id))
      )
  }
}
