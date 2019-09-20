import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-posts-show',
  templateUrl: './posts-show.component.html',
  styleUrls: ['./posts-show.component.css']
})
export class PostsShowComponent implements OnInit {

  id: number;
  userId: number
  post$: Observable<any>;
  editavel: boolean
  postForm = new FormGroup({
    text: new FormControl(
      '',
      [
        Validators.required,
        Validators.minLength(20)
      ]
    )
  })

  constructor(
    private _route: ActivatedRoute,
    private _postsService: PostsService,
    private _router: Router,
    private _auth: AuthService
  ) { }

  ngOnInit() {

    this.id = this._route.snapshot.params.id
    this.post$ = this._postsService.show(this.id)
    this.post$.subscribe()

    const decode = this._auth.getUser()

    this.userId = decode.sub

  }

  deletePost() {
    if (confirm('Are you sure do you want delete this post?')) {
      this._postsService.delete(this.id).subscribe()
      this._router.navigate(['posts'])
    }
  }

  updatePost() {
    if (this.postForm.valid) {
      this._postsService.update(this.postForm.value, this.id).subscribe()
      this.post$ = this._postsService.show(this.id)
      this.post$.subscribe()
      this.editavel = false
    } else {
      alert('The field text must be filled with at least 20 characters')
    }
  }
}
