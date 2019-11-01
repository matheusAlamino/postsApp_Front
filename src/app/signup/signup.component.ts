import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  hide: boolean = true
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
    private _authService: AuthService,
    private _route: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  signup() {

    if (this.registerForm.valid) {
      this._authService.storeUser(this.registerForm.value);
      console.log(this.registerForm.value)
      this._route.navigate([''])
    } else {
      this._snackBar.open(`All fields need to be filled!`, 'OK', {
        duration: 15000
      })
    }
  }
}
