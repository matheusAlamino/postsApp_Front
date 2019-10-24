import { Component, OnInit, Input } from '@angular/core';
import { NotificationsService } from '../notifications.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  @Input() notifications: any[] = []
  opened: boolean = false

  constructor(private _notificationsService: NotificationsService) { }

  ngOnInit() {

  }

  deleteNotification(id: number) {
    if (confirm('Are you sure do you want delete this post?')) {
      this._notificationsService.delete(id).subscribe(res => {
        location.reload()
      })
    }
  }
}
