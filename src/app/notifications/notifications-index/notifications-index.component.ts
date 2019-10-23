import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../notifications.service';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-notifications-index',
  templateUrl: './notifications-index.component.html',
  styleUrls: ['./notifications-index.component.css']
})
export class NotificationsIndexComponent implements OnInit {

  constructor(private _notificationsService: NotificationsService,
    private _auth: AuthService) { }

  notifications: any[] = []
  totalList = 0
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

        if (response['countNotSeen'] > 0) {
          const userToken = this._auth.getUser()
          this.userId = userToken.sub
          this._notificationsService.update(this.userId).subscribe()
        }
      }
    })
  }
}
