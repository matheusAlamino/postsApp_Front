import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {

  userId: number
  posts: any[] = []
  totalList = 0

  constructor(private _authService: AuthService,
    public dialogRef: MatDialogRef<MyPostsComponent>) { }

  ngOnInit() {
    this.loadMyPosts(1)
  }

  pageEvent(page: PageEvent) {
    const pageNumber = page.pageIndex + 1
    this.loadMyPosts(pageNumber)
  }

  loadMyPosts(page: number) {
    const userToken = this._authService.getUser()
    this.userId = userToken.sub
    this._authService.pullMyPosts(this.userId, page).subscribe(res => {
      this.posts = res['data']
      this.totalList = res['total']
    })
  }

  closeDialog() {
    this.dialogRef.close()
  }
}
