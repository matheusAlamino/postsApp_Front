import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersShowComponent } from './users-show/users-show.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from '../auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from '../auth-interceptor.service';
import { MaterialFlexModule } from '../material-flex/material-flex.module';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@NgModule({
  declarations: [
    UsersShowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialFlexModule,
    ConfirmationComponent
  ],
  exports: [UsersShowComponent],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
export class UsersModule { }
