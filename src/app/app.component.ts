import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CurrentUserService } from './core/auth/current-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'KawApp';

  constructor(
    private currentUserService: CurrentUserService,
  ) { }

  ngOnInit(): void {
    if (!environment.production) this.useAppAsA('user');
  }

  /**
   * Allows you to use the application as a default user or default admin.
   * @param {string} role The user role. Can be `'user'` or `'admin'`.
   */
  private useAppAsA(role: string): void {
    if (!environment.production) {
      switch (role) {
        case 'admin':
          this.currentUserService.save(environment.default_admin.token);
          break;
        case 'user':
          this.currentUserService.save(environment.default_user.token);
          break;
        default:
          this.currentUserService.save(environment.default_user.token);
          break;
      }
      console.info('You use the application with a default user:', this.currentUserService.currentUser);
    }
    else {
      console.error(`Impossible to use the application with a default ${role}!`);
    }
  }
}
