import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UsersShowComponent } from '../users/users-show/users-show.component';
import { PostsStoreComponent } from '../posts/posts-store/posts-store.component';
import { NotificationsService } from '../notifications/notifications.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MyPostsComponent } from '../posts/my-posts/my-posts.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() expand = new EventEmitter()
  userName: string;
  userId: number;
  showLogout: boolean = false
  novaNotificacao: number = 0

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _dialog: MatDialog,
    private _notificationsService: NotificationsService,
    private _bottomSheet: MatBottomSheet
  ) {
  }

  ngOnInit() {
    const userToken = this._auth.getUser()
    this.userName = userToken.name
    this.userId = userToken.sub
    this.verificaNotificacaoNova()
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

  openNewPost(): void {
    const dialogRef = this._dialog.open(PostsStoreComponent, {
      width: '450px'
    });
  }

  openMyPosts(): void {
    const dialogRef = this._dialog.open(MyPostsComponent, {
      width: '450px'
    });
  }

  verificaNotificacaoNova() {
    this._notificationsService.index(1).subscribe(response => {
      this.novaNotificacao = response['countNotSeen']
    })
  }

  disparaEvento() {
    this.expand.emit('')
    this.novaNotificacao = 0
  }
}
