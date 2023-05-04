import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CurrentUserService } from './current-user.service';

@Injectable({
  providedIn: 'root'
})
export class PublicAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private currentUserService: CurrentUserService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.checkToken()) {
      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }

  private checkToken(): boolean {
    return this.currentUserService.currentUser.getToken() ? true : false;
  }
}
