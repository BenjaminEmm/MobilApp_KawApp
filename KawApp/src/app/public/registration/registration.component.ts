import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistrationData } from 'src/app/shared/classes/RegistrationData';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{

  public registrationForm = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    zipcode: new FormControl(null, [Validators.required]),
    company: new FormControl(null, [Validators.required]),
  });

  constructor(
    // private userService: UserService,
  ) { }

  ngOnInit(): void {
      
  }

  onSubmit(): void {
    console.log('onSubmit');
    const args = this.registrationForm.value;
    const registrationData = new RegistrationData(args);
    console.log(registrationData)
  }

}
