import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  hide: boolean = true
  loginForm = new FormGroup({
    email: new FormControl(
      '',
      [
        Validators.required,
        Validators.email
      ]
    ),
    password: new FormControl(
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(24)
      ])
  });

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {

  }

  login() {
    if (this.loginForm.valid) {
      this._authService.login(this.loginForm.value)
    }
  }
}
