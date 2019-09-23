import { Component, OnInit, ViewChild } from '@angular/core';
import { PostsService } from '../posts.service';
import { PageEvent, MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-posts-index',
  templateUrl: './posts-index.component.html',
  styleUrls: ['./posts-index.component.css']
})
export class PostsIndexComponent implements OnInit {
  constructor(private _postsService: PostsService) { }

  posts: any[] = []
  totalList = 0

  ngOnInit() {
    this.loadList(1)

  }

  pageEvent(page: PageEvent) {
    const pageNumber = page.pageIndex + 1
    this.loadList(pageNumber)
  }

  loadList(page: number) {
    this._postsService.index(page).subscribe(response => {
      this.posts = response['data']
      this.totalList = response['total']
    })
  }
}
