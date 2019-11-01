import { Component, OnInit, Input } from '@angular/core';
import { NotificationsService } from '../notifications.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ConfirmationComponent } from 'src/app/confirmation/confirmation.component';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  @Input() notifications: any[] = []
  opened: boolean = false

  constructor(private _notificationsService: NotificationsService,
    private _confirmationSheet: MatBottomSheet) { }

  ngOnInit() {

  }

  deleteNotification(id: number) {
    this._confirmationSheet.open(ConfirmationComponent, {
      data: {
        message: "Are you sure do you want delete this notification?",
        confirmButton: true,
        answer: () => {
          this._notificationsService.delete(id).subscribe(res => {
            location.reload()
          })
        }
      }
    })
  }
}
