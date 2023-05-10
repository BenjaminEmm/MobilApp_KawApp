import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CurrentUserService } from './current-user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { UserCredentials } from 'src/app/shared/classes/UserCredentials';
import { ErrorService } from 'src/app/shared/services/error.service';
import { MockService } from 'src/app/shared/services/mock.service';
import { RegistrationData } from 'src/app/shared/classes/RegistrationData';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private currentUserService: CurrentUserService,
    private errorService: ErrorService,
    private mockService: MockService,
    private httpClient: HttpClient,
  ) { }

  public signIn(userCredentials: UserCredentials): any | Observable<any> {

    if (userCredentials.adresseMail.endsWith('@kawapp.fr')) {
      const username = userCredentials.adresseMail.split('@')[0];
      this.useAppAsA(username);
      return this.currentUserService.currentUser.getToken();
    }

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(userCredentials);
    const options = { headers };

    return this.httpClient.post<any>(`${environment.uri.api.crm}/Clients/login`, body, options)
      .pipe(
        tap((res: any) => {
          this.currentUserService.save(res.token);
        }),
        catchError(this.errorService.handleError('signIn', userCredentials))
      )
  }

  public signUp(data: RegistrationData): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(data);
    const options = { headers };

    return this.httpClient.post<any>(`${environment.uri.api.crm}/Clients/register`, body, options)
      .pipe(
        tap((res: any) => res),
        catchError(this.errorService.handleError('signUp', data))
      );
  }

  /**
 * Allows you to use the application as a default user or default admin.
 * @param {string} role The user role. Can be `'user'` or `'admin'`.
 */
  private useAppAsA(role: string, data: any = null): void {
    if (!environment.production) {
      switch (role) {
        case 'admin':
          this.currentUserService.save(environment.defaultAdmin.token);
          break;
        case 'user':
          this.currentUserService.save(environment.defaultUser.token);
          break;
        default:
          this.currentUserService.save(environment.defaultUser.token);
          break;
      }
      console.info('You use the application with a default user:', this.currentUserService.currentUser);
    }
    else {
      console.error(`Impossible to use the application with a default ${role}!`);
    }
  }
}
