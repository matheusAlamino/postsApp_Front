import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName: string;
  userId: number;
  showLogout: boolean = false

  constructor(
    private _auth: AuthService,
    private _router: Router
  ) {
  }

  ngOnInit() {
    const userToken = this._auth.getUser()
    this.userName = userToken.name
    this.userId = userToken.sub
  }

  logout() {
    this._auth.logout();
    this._router.navigate(['']);
  }
}
