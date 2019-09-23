import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../notifications.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-notifications-index',
  templateUrl: './notifications-index.component.html',
  styleUrls: ['./notifications-index.component.css']
})
export class NotificationsIndexComponent implements OnInit {

  constructor(private _notificationsService: NotificationsService) { }

  notifications: any[] = []
  totalList = 0

  ngOnInit() {
    this.loadList(1)

  }

  pageEvent(page: PageEvent) {
    const pageNumber = page.pageIndex + 1
    this.loadList(pageNumber)
  }

  loadList(page: number) {
    this._notificationsService.index(page).subscribe(response => {
      this.notifications = response['data']
      this.totalList = response['total']
    })
  }
}
