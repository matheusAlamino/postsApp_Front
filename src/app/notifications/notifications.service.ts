import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private _http: HttpClient) { }

  index() {
    return this._http.get<any[]>(`${environment.api}/notification`)
  }

  delete(id: number) {
    return this._http.delete(`${environment.api}/notification/${id}`)
  }
}
