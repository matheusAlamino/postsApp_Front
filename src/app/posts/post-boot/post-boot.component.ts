import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NotificationsIndexComponent } from 'src/app/notifications/notifications-index/notifications-index.component';

@Component({
  selector: 'app-post-boot',
  templateUrl: './post-boot.component.html',
  styleUrls: ['./post-boot.component.css']
})
export class PostBootComponent implements OnInit {

  @ViewChild("snav") snav: MatSidenav
  @ViewChild("ani") updateNotificacoes: NotificationsIndexComponent

  constructor() { }

  ngOnInit() {
  }

  openSideNav() {
    if (this.snav.opened)
      this.snav.close()
    else {
      this.snav.open()
      this.updateNotificacoes.update()
    }
  }
}
