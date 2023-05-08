import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { CurrentUserService } from "./current-user.service";

@Injectable({
    providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private currentUserService: CurrentUserService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const authorization = this.checkToken();
        if (!authorization) {
            this.router.navigate(['/home']);
            return false;
        } else {
            return true;
        }
    }

    private checkToken(): boolean {
        const token = this.currentUserService.currentUser.getToken();
        if (!token) return false;
        const role = this.currentUserService.currentUser.role;
        if (!role) return false;
        const isAdmin = role === 'admin';
        return isAdmin;
    }
}
