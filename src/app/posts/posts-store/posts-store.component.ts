import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private _router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  storePost() {
    if (this.postForm.valid)
      this._postsService.store(this.postForm.value)
    else
      this._snackBar.open('The field must be filled with at least 20 characters', 'OK', {
        duration: 15000
      })
  }

}
