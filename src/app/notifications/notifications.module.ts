import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsIndexComponent } from './notifications-index/notifications-index.component';
import { Routes, RouterModule } from '@angular/router';
import { NotificationsService } from './notifications.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from '../auth-interceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationComponent } from './notification/notification.component';
import { MaterialFlexModule } from '../material-flex/material-flex.module';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'index' },
  { path: 'index', component: NotificationsIndexComponent, data: { title: 'Notifications' } },
];

@NgModule({
  declarations: [
    NotificationsIndexComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MaterialFlexModule
  ],
  providers: [
    NotificationsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
export class NotificationsModule { }
