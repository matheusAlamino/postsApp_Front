import { Component, OnInit, Input, EventEmitter, ViewChild } from '@angular/core';
import { NotificationsService } from '../notifications.service';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/auth.service';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-notifications-index',
  templateUrl: './notifications-index.component.html',
  styleUrls: ['./notifications-index.component.css']
})
export class NotificationsIndexComponent implements OnInit {

  constructor(private _notificationsService: NotificationsService,
    private _auth: AuthService) { }

  @ViewChild("appNotify") appNotify: NotificationComponent
  notifications: any[] = []
  totalList = 0
  count = 0
  userId: number;

  ngOnInit() {
    this.loadList(1)
  }

  pageEvent(page: PageEvent) {
    const pageNumber = page.pageIndex + 1
    this.loadList(pageNumber)
  }

  loadList(page: number) {
    this._notificationsService.index(page).subscribe(response => {
      if (!response['message']) {
        this.notifications = response['data']['data']
        this.totalList = response['data']['total']
        this.count = response['countNotSeen']
      }
    })
  }

  update() {
    if (this.count > 0) {
      this.appNotify.opened = true
      const userToken = this._auth.getUser()
      this.userId = userToken.sub
      this._notificationsService.update(this.userId).subscribe()
      this.count = 0
    } else
      this.appNotify.opened = false
  }
}
