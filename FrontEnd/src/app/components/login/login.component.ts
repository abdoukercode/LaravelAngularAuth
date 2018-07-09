import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../../services/apicall.service';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
public form = {
  email: null,
  password: null
};

public error = null;
  constructor(
    private _service: ApicallService,
     private _token: TokenService,
     private _router: Router,
     private _auth: AuthService
    ) { }

  ngOnInit() {
  }


  onSubmit() {
    return this._service.login(this.form)
      .subscribe(
          data => this.handleResponse(data),
          error => this.handleError(error));
  }

  handleResponse(data) {
    this._token.handle(data.access_token);
    this._auth.changeAuthStatus(true);
    this._router.navigateByUrl('/profile');
  }
  handleError(error) {
    this.error = error.error.error;
  }
}

