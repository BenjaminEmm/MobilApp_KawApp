import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserCredentials } from 'src/app/shared/classes/UserCredentials';
import { AuthenticationService } from 'src/app/core/auth/authentication.service';
import { CurrentUserService } from 'src/app/core/auth/current-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  public authForm = new FormGroup({
    adresseMail: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(
    private authService: AuthenticationService,
    private currentUserService: CurrentUserService,
    private router: Router,
  ) { }

  onSubmit(): void {
    const args = this.authForm.value;
    const credentials = new UserCredentials(args);

    if (credentials.adresseMail.endsWith('@kawapp.fr')) {
      this.authService.signIn(credentials);
      if (this.currentUserService.isLogged()) {
        this.router.navigate(['/profile']);
      }
    } else {
      this.authService.signIn(credentials)
        .subscribe(
          (res: any) => {
            if (this.currentUserService.isLogged()) {
              this.router.navigate(['/profile']);
            }
          }
        );
    }


  }
}
