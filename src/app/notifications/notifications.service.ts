import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private _http: HttpClient) { }

  index(page: number) {
    return this._http.get<any[]>(`${environment.api}/notification?page=${page}`)
  }

  delete(id: number) {
    return this._http.delete(`${environment.api}/notification/${id}`)
  }

  update(idUser: number) {
    return this._http.put(
      `${environment.api}/user/${idUser}/Notifications`,
      JSON.stringify('Alterando notificacoes para vistas'))
  }
}
