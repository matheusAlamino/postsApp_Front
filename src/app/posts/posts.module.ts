import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsIndexComponent } from './posts-index/posts-index.component';
import { PostsShowComponent } from './posts-show/posts-show.component';
import { Routes, RouterModule } from '@angular/router';
import { PostsStoreComponent } from './posts-store/posts-store.component';
import { PostsCommentStoreComponent } from './posts-comment-store/posts-comment-store.component';
import { PostsService } from './posts.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from '../auth-interceptor.service';
import { PostComponent } from './post/post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentsModule } from '../comments/comments.module';
import { PostBootComponent } from './post-boot/post-boot.component';
import { HeaderComponent } from '../header/header.component';
import { MaterialFlexModule } from '../material-flex/material-flex.module';
import { UsersModule } from '../users/users.module';
import { UsersShowComponent } from '../users/users-show/users-show.component';
import { NotificationsIndexComponent } from '../notifications/notifications-index/notifications-index.component';
import { NotificationComponent } from '../notifications/notification/notification.component';


const routes: Routes = [
  {
    path: '', component: PostBootComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'index' },
      { path: 'index', component: PostsIndexComponent, data: { title: 'Feed' } },
      { path: 'show/:id', component: PostsShowComponent, data: { title: 'Post' } },
      { path: 'store', component: PostsStoreComponent, data: { title: 'Save post' } },
      { path: 'storeComment/:id/Comment', component: PostsCommentStoreComponent, data: { title: 'Save Comment' } },
      { path: 'notifications', loadChildren: '../notifications/notifications.module#NotificationsModule' },
      { path: 'users', loadChildren: '../users/users.module#UsersModule' }
    ]
  },
];

@NgModule({
  declarations:
    [
      PostsIndexComponent,
      PostsShowComponent,
      PostsStoreComponent,
      PostsCommentStoreComponent,
      PostComponent,
      PostBootComponent,
      HeaderComponent,
      UsersShowComponent,
      NotificationsIndexComponent,
      NotificationComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    CommentsModule,
    MaterialFlexModule
  ],
  entryComponents: [
    UsersShowComponent,
    NotificationsIndexComponent,
    NotificationComponent
  ],
  providers: [
    PostsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],

})
export class PostsModule { }
