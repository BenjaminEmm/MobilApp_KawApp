import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrentUserService } from './current-user.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private currentUserService: CurrentUserService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.getToken();

    if (!token)
      return next.handle(req);

    const tokenizedReq = this.setAuthorizationHeader(req, token);

    return next.handle(tokenizedReq);
  }

  private getToken() {
    return this.currentUserService.currentUser.getToken();
  }

  private setAuthorizationHeader(req: HttpRequest<any>, token: string) {
    return req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token
      }
    });
  }
}
