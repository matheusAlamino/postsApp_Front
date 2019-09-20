import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts-store',
  templateUrl: './posts-store.component.html',
  styleUrls: ['./posts-store.component.css']
})
export class PostsStoreComponent implements OnInit {

  postForm = new FormGroup({
    text: new FormControl(
      '',
      [
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(255)
      ])
  })

  constructor(
    private _postsService: PostsService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  storePost() {
    if (this.postForm.valid)
      this._postsService.store(this.postForm.value)
    else
      alert('The field must be filled with at least 20 characters')
  }

}
