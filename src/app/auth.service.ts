import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TokenService } from './token/token.service';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  ngOnInit(): void {
    this._token.hasToken() &&
      this.decodeAndNotify();
  }

  userSubject = new BehaviorSubject<any>(null);

  constructor(
    private _http: HttpClient,
    private _token: TokenService,
    private _router: Router) {

  }

  login(user: any) {
    console.log(JSON.stringify(user))
    return this._http.post<any>(
      `${environment.api}/auth/login`,
      JSON.stringify(user))
      .toPromise().then(response => {
        this._token.setToken(response.access_token)
        this.decodeAndNotify();
        this._router.navigate(['posts'])
      },
        err => {
          alert('Invalid username or password')
        })
  }

  logout() {
    this._token.removeToken();
    this.userSubject.next(null);
  }

  storeUser(user: any) {
    this._http.post(
      `${environment.api}/user`,
      JSON.stringify(user)
    ).subscribe(response => {
      console.log(response);
    },
      err => {
        alert('Error')
      })
  }

  showUser(id: number) {
    return this._http.get(`${environment.api}/user/${id}`)
  }

  updateUser(user: any, id: number) {
    return this._http.put(
      `${environment.api}/user/${id}`,
      JSON.stringify(user))
  }

  delete(id: number) {
    return this._http.delete(`${environment.api}/user/${id}`)
  }

  getUser() {
    const token = this._token.getToken();
    return jwt_decode(token) as any;
  }

  private decodeAndNotify() {
    const token = this._token.getToken();
    const user = jwt_decode(token) as any;
    this.userSubject.next(user);
  }
}
