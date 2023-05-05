import { Injectable } from "@angular/core";
import { CurrentUser } from "src/app/shared/classes/CurrentUser";
import { DecodedToken } from "src/app/shared/classes/DecodedToken";
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  public currentUser: CurrentUser = new CurrentUser();

  constructor() { }

  public load(): void {
    const token = this.currentUser.getToken();

    if (!token) {
      console.error('token not found');
    } else {
      const args: DecodedToken | null = this.decodeToken(token);
      this.currentUser = new CurrentUser(args);
    }
  }

  public save(token: string): void {
    localStorage.setItem('token', token);
    this.load();
  }

  private decodeToken(token: string): DecodedToken | null {
    try {
      return new DecodedToken(jwt_decode(token));
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  public reset(): void {
    this.currentUser = new CurrentUser();
    localStorage.removeItem('token');
  }
}
