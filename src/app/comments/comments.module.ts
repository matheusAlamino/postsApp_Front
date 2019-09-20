import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentShowComponent } from './comment-show/comment-show.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentsService } from './comments.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from '../auth-interceptor.service';
import { MaterialFlexModule } from '../material-flex/material-flex.module';

@NgModule({
  declarations:
    [
      CommentShowComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialFlexModule
  ],
  exports: [CommentShowComponent],
  providers: [
    CommentsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
export class CommentsModule { }
