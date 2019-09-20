import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../notifications.service';

@Component({
  selector: 'app-notifications-index',
  templateUrl: './notifications-index.component.html',
  styleUrls: ['./notifications-index.component.css']
})
export class NotificationsIndexComponent implements OnInit {

  constructor(private _notificationsService: NotificationsService) { }

  notifications: any[] = []

  ngOnInit() {

    this._notificationsService.index().subscribe(response => {
      this.notifications = response
    })
  }
}
