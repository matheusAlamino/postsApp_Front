import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UsersShowComponent } from '../users/users-show/users-show.component';
import { NotificationsIndexComponent } from '../notifications/notifications-index/notifications-index.component';
import { PostsStoreComponent } from '../posts/posts-store/posts-store.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName: string;
  userId: number;
  showLogout: boolean = false

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _dialog: MatDialog
  ) {
  }

  ngOnInit() {
    const userToken = this._auth.getUser()
    this.userName = userToken.name
    this.userId = userToken.sub
  }

  logout() {
    this._auth.logout();
    this._router.navigate(['']);
  }

  openDialog(): void {
    const dialogRef = this._dialog.open(UsersShowComponent, {
      width: '450px'
    });
  }

  openDialogNotify(): void {
    const dialogRef = this._dialog.open(NotificationsIndexComponent, {
      width: '450px'
    });
  }

  openNewPost(): void {
    const dialogRef = this._dialog.open(PostsStoreComponent, {
      width: '450px'
    });
  }
}
