import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from './auth.service';
import { TokenService } from './token/token.service';
import { AuthInterceptorService } from './auth-interceptor.service';
import { UsersShowComponent } from './users/users-show/users-show.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialFlexModule } from './material-flex/material-flex.module';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'signin' },
  { path: 'signin', component: SigninComponent, data: { title: 'Sign in' } },
  { path: 'signup', component: SignupComponent, data: { title: 'Sign up' } },
  { path: 'posts', loadChildren: './posts/posts.module#PostsModule' }
];

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialFlexModule,
  ],
  exports: [
    HttpClientModule
  ],
  providers: [
    AuthService,
    TokenService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
