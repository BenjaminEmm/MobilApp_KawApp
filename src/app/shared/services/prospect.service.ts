import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { Observable, catchError, map } from 'rxjs';
import { ProspectModel } from '../models/prospect.model';

@Injectable({
  providedIn: 'root'
})
export class ProspectService {

  constructor(
    private errorService: ErrorService,
    private httpClient: HttpClient,
  ) { }

  create(data: ProspectModel): Observable<ProspectModel> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(data);
    const options = { headers };
    return this.httpClient.post<ProspectModel>(`${env.uri.api.crm}/Prospects`, body, options)
      .pipe(
        map(res => new ProspectModel(res)),
        catchError(this.errorService.handleError('create prospect', data))
      );
  }

  getAll(): Observable<ProspectModel[]> {
    return this.httpClient.get<ProspectModel[]>(`${env.uri.api.crm}/Prospects`)
      .pipe(
        map((res) => res.map((prospect: any) => new ProspectModel(prospect))),
        catchError(this.errorService.handleError('get all prospects', []))
      );
  }

  getById(id: number): Observable<ProspectModel> {
    return this.httpClient.get<ProspectModel>(`${env}/Prospects/${id}`)
      .pipe(
        map(res => new ProspectModel(res)),
        catchError(this.errorService.handleError('get prospect by id', new ProspectModel({ id })))
      )
  }

  updateById(id: number, data: ProspectModel): Observable<ProspectModel> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(data);
    const options = { headers };
    return this.httpClient.put<ProspectModel>(`${env.uri.api.crm}/Prospects/${id}`, body, options)
      .pipe(
        map(res => new ProspectModel(res)),
        catchError(this.errorService.handleError('update prospect by id', data))
      )
  }

  public deleteById(id: number): Observable<number> {
    return this.httpClient.delete<any>(`${env.uri.api.crm}/Prospects/${id}`)
      .pipe(
        map((res: any) => id),
        catchError(this.errorService.handleError('delete prospect by id', id))
      )
  }
}
