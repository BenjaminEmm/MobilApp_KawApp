import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { CurrentUserService } from "./current-user.service";

@Injectable({
    providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private currentUserService: CurrentUserService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (!this.checkToken() || !this.checkRole()) {
            this.router.navigate(['/home']);
            return false;
        } else {
            return true;
        }
    }

    private checkToken(): boolean {
        return this.currentUserService.currentUser.getToken() ? true : false;
    }

    private checkRole(): boolean {
        return this.currentUserService.currentUser.role === "admin";
    }
}
