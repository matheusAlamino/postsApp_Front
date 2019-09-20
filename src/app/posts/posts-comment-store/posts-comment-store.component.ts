import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts-comment-store',
  templateUrl: './posts-comment-store.component.html',
  styleUrls: ['./posts-comment-store.component.css']
})
export class PostsCommentStoreComponent implements OnInit {

  commentForm = new FormGroup({
    description: new FormControl('', Validators.required)
  })
  id: number

  constructor(
    private _postsService: PostsService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  storeComment() {
    this.id = this._route.snapshot.params.id
    this._postsService
      .storeComment(this.commentForm.value, this.id)
      .subscribe(res => {
        location.reload()
      })
  }

}
