import { HttpClient } from '@angular/common/http';
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

  public getAll(): Observable<CustomerModel[]> {
    return this.httpClient.get<CustomerModel>(`${env.uri}/customers/`)
      .pipe(
        map((response: any) => response.map((customer: any) => new CustomerModel(customer))),
        catchError(this.errorService.handleError('/customers/:id/', []))
      )
  }

  public getById(customerId: number): Observable<CustomerModel> {
    return this.httpClient.get<CustomerModel>(`${env.uri}/customers/${customerId}/`)
      .pipe(
        map((response: any) => new CustomerModel(response)),
        catchError(this.errorService.handleError('/customers/:id/', new CustomerModel()))
      )
  }
}
