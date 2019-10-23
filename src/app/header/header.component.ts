import { Component, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UsersShowComponent } from '../users/users-show/users-show.component';
import { NotificationsIndexComponent } from '../notifications/notifications-index/notifications-index.component';
import { PostsStoreComponent } from '../posts/posts-store/posts-store.component';
import { NotificationsService } from '../notifications/notifications.service';
import { EventEmitter } from 'protractor';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

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

  openBottomSheet(): void {
    const btSheetOpen = this._bottomSheet.open(NotificationsIndexComponent);

    btSheetOpen.afterDismissed().subscribe(result => {
      this.verificaNotificacaoNova()
    })
  }

  openNewPost(): void {
    const dialogRef = this._dialog.open(PostsStoreComponent, {
      width: '450px'
    });
  }

  verificaNotificacaoNova() {
    this._notificationsService.index(1).subscribe(response => {
      this.novaNotificacao = response['countNotSeen']
    })
  }
}
