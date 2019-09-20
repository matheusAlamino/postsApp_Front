import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }

  index() {
    return this._http.get<any[]>(`${environment.api}/post`)
  }

  show(id: number) {
    return this._http.get(`${environment.api}/post/${id}`)
  }

  store(post: any) {
    return this._http.post(
      `${environment.api}/post`,
      JSON.stringify(post)
    ).toPromise().then(response => {
      this._router.navigate(['posts'])
    })
  }

  storeComment(comment: any, id: number) {
    return this._http.post(
      `${environment.api}/post/${id}/Comment`,
      JSON.stringify(comment))
  }

  delete(id: number) {
    return this._http.delete(`${environment.api}/post/${id}`)
  }

  update(post: any, id: number) {
    return this._http.put(
      `${environment.api}/post/${id}`,
      JSON.stringify(post))
  }
}
