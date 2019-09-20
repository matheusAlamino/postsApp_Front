import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token/token.service';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private _tokenService: TokenService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {

    if (this._tokenService.hasToken()) {
      const token = this._tokenService.getToken();
      req = req.clone({
        setHeaders: {
          'Authorization': 'Bearer ' + token,
          'Content-type': 'application/json',
          'Accept': 'application/json'
        }
      });
    } else {
      req = req.clone({
        setHeaders: {
          'Content-type': 'application/json',
          'Accept': 'application/json'
        }
      });
    }
    return next.handle(req);
  }
}
