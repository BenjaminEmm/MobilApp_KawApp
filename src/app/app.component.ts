import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CurrentUserService } from './core/auth/current-user.service';
import { Router, NavigationEnd } from '@angular/router';
import { NavigationService } from './shared/services/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'KawApp';

  constructor(
    private currentUserService: CurrentUserService,
    private navigationService: NavigationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscribeToRouterEvents();
    this.currentUserService.load();
  }

  private subscribeToRouterEvents(): void {
    this.router.events.subscribe(
      obs => {
        if (obs instanceof NavigationEnd) {
          this.navigationService.setCurrentRoute(obs.url);
        }
      }
    );
  }
}
