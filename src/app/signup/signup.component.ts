import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerForm = new FormGroup({
    name: new FormControl(
      '',
      [
        Validators.required,
        Validators.maxLength(255)
      ]),
    email: new FormControl(
      '',
      [
        Validators.email,
        Validators.required
      ]),
    password: new FormControl(
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(24)
      ])
  })

  constructor(
    private _authService: AuthService
  ) { }

  ngOnInit() {
  }

  signup() {

    if (this.registerForm.valid) {
      this._authService.storeUser(this.registerForm.value);
      console.log(this.registerForm.value)
    } else {
      alert('All fields must be filled')
    }
  }

}
