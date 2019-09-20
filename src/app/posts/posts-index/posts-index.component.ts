import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-posts-index',
  templateUrl: './posts-index.component.html',
  styleUrls: ['./posts-index.component.css']
})
export class PostsIndexComponent implements OnInit {
  constructor(private _postsService: PostsService) { }

  posts: any[] = []

  ngOnInit() {

    this._postsService.index().subscribe(response => {
      this.posts = response
    })
  }
}
