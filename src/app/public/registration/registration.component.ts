import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/auth/authentication.service';
import { RegistrationData } from 'src/app/shared/classes/RegistrationData';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public registrationForm = new FormGroup({
    adresseMail: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  public seconds: number = 5;
  public success!: boolean;
  public error!: boolean;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void {

  }

  onSubmit(): void {
    const args = this.registrationForm.value;
    const registrationData = new RegistrationData(args);
    this.authService.signUp(registrationData).subscribe(
      (res: any) => {
        this.success = true;
        const interval = setInterval(() => {
          this.seconds--;
          if (this.seconds === 0) {
            this.router.navigate(['authentication']).then(() => {
              this.seconds = 5;
              clearInterval(interval);
            });
          }
        }, 1000);
      }
    )
  }
}
