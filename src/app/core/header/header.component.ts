import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { CurrentUserService } from '../auth/current-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public class: string = 'default-header';
  private _currentRoute: string = '/home';
  private subscriptionOfCurrentRoute: Subscription = new Subscription();

  constructor(
    private currentUserService: CurrentUserService,
    private navigationService: NavigationService,
  ) { }

  ngOnInit(): void {
    this.subscribeToCurrentRoute();
  }

  private subscribeToCurrentRoute(): void {
    this._currentRoute = this.navigationService.getCurrentRoute();
    this.subscriptionOfCurrentRoute = this.navigationService.currentRoute.subscribe(
      observer => {
        this._currentRoute = observer;
        this.updateHeaderByRoute();
      }
    )
  }

  private updateHeaderByRoute(): void {
    this.class = 'default-header';

    if (this._currentRoute === '/home' || this._currentRoute.endsWith('/ar-scene')) {
      this.class = 'hidden';
    }
  }

  public getClass(): string {
    return this.class;
  }

  public authenticatedUser(): boolean {
    return this.currentUserService.currentUser.getToken() ? true : false;
  }
}
