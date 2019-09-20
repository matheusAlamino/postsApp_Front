import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private _http: HttpClient) { }

  delete(id: number) {
    return this._http.delete(`${environment.api}/comment/${id}`)
  }

  update(comment: any, id: number) {
    return this._http.put(
      `${environment.api}/comment/${id}`,
      JSON.stringify(comment))
  }
}
