import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CurrentUserService } from './current-user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { UserCredentials } from 'src/app/shared/classes/UserCredentials';
import { ErrorService } from 'src/app/shared/services/error.service';
import { MockService } from 'src/app/shared/services/mock.service';

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

    if (!environment.production) {
      this.useAppAsA('admin');
      return environment.defaultUser.token;

    } else {

      const body = JSON.stringify(userCredentials);

      const options = {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      }

      return this.httpClient.post<any>(`${environment.uri}/login`, body, options)
        .pipe(
          tap((token: string) => this.currentUserService.save(token)),
          catchError(this.errorService.handleError('signIn', []))
        )

    }

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
