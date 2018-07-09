import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../../services/apicall.service';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

public form = {
  email : null,
  password : null,
  name: null,
  password_confirmation: null
};
public error = [];
constructor(
  private _service: ApicallService,
   private _token: TokenService,
   private _router: Router
  ) { }

  ngOnInit() {
  }


  onSubmit() {

    this._service.signup(this.form).subscribe(
          data => this.handleResponse(data),
          error => this.handleError(error));
  }
  handleError(error) {
    this.error = error.error.errors;
  }

  handleResponse(data) {
    this._token.handle(data.access_token);
    this._router.navigateByUrl('/profile');
  }

}
