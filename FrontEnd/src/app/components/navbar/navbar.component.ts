import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
public loggedIn: boolean;
  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _token: TokenService
  ) { }

  ngOnInit() {
    this._auth.authStatus.subscribe(value => this.loggedIn = value);
  }

  logout(event: MouseEvent) {
  event.preventDefault();
  this._token.remove();
  this._auth.changeAuthStatus(false);
  this._router.navigateByUrl('/login');
  }

}
