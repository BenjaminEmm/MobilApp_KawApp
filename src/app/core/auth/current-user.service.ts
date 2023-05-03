import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { CurrentUser } from "src/app/shared/classes/CurrentUser";
import { DecodedToken } from "src/app/shared/classes/DecodedToken";
// import { CurrentUserInterface } from "src/app/shared/interfaces/current-user.interface";
// import { MembershipRequestModel } from "src/app/shared/models/MembershipRequestModel";
// import { ParticipationRequestModel } from "src/app/shared/models/ParticipationRequestModel";
// import { ParticipationRequestService } from "src/app/shared/services/event-participation-request.service";
// import { FactoryService } from "src/app/shared/services/factory.service";
// import { MembershipRequestService } from "src/app/shared/services/membership-request.service";
import jwt_decode from "jwt-decode";
// import { UserModel } from "src/app/shared/models/UserModel";
// import { EventModel } from "src/app/shared/models/EventModel";
// import { TeamModel } from "src/app/shared/models/TeamModel";

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  public currentUser: CurrentUser = new CurrentUser();

  constructor() { }

  public load(): void {
    const token = this.currentUser.getToken();

    if (!token) return console.error("token not found");

    const args: DecodedToken | null = this.decodeToken(token);
    this.currentUser = new CurrentUser(args);
  }



  public save(token: string): void {
    localStorage.setItem('token', token);
    this.load();
  }

  private decodeToken(token: string | null = localStorage.getItem('token')): DecodedToken | null {
    if (!token) return null;
    else {
      try {
        return new DecodedToken(jwt_decode(token));
      } catch (err) {
        console.error(err);
        return null;
      }
    }
  }

  public reset(): void {
    this.currentUser = new CurrentUser();
    localStorage.removeItem('token');
  }
}
