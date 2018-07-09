import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { ApicallService } from '../../../services/apicall.service';
import {  SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {
public error = [];

public form = {
  email: null,
  password: null,
  password_confirmation: null,
  resetToken: null
};
  constructor(
    private _route: ActivatedRoute,
    private _service: ApicallService,
    private _router: Router,
    private _notify: SnotifyService
  ) {
    /* _notify.error('uhmm error'); */
    _route.queryParams.subscribe(params => {
      this.form.resetToken = params['token'];
      this.form.email = params['email'];
     console.log(this.form.email);
    });

  }

  onSubmit() {
    this._service.changePassword(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {

    const _router = this._router;
    this._notify.confirm('Done!, Now login with new password', {
      buttons: [
        {
          text: 'Okay',
          action: toster => {
            _router.navigateByUrl('/login'),
            this._notify.remove(toster.id);
          }
      },
      ]
    });
    this._router.navigateByUrl('/login');
  }

  handleError(error) {
    this.error = error.error.errors;
  }

  ngOnInit() {

  }

}
