import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenService } from './token/token.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private _tokenService: TokenService,
    private _router: Router,
    private _snackBar: MatSnackBar) { }

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

    return next.handle(req).pipe(
      catchError((httpErrorResponse: HttpErrorResponse) => {
        let status = httpErrorResponse.status

        //quando status eh 401, usuario nao autorizado
        if (status == 401) {
          this._snackBar.open(`Invalid, please try again | ${httpErrorResponse.error['message']}`, 'OK', {
            duration: 15000
          })
          this._router.navigate([''])
        }

        return throwError(httpErrorResponse);
      }))
  }
}
