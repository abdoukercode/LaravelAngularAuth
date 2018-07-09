import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../../../services/apicall.service';
import {  SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {
public form  = {
  email: null
};
  constructor(private _service: ApicallService, private _notify: SnotifyService, private _Notify: SnotifyService) { }

  ngOnInit() {
  }

onSubmit() {
  this._Notify.info('Wait ....', {timeout: 5000});
  this._service.sendPasswordResetLink(this.form).subscribe(
    data => this.handleResponse(data),
    error => this._notify.error(error.error)
  );
}
handleResponse(res) {
  if (res.error) {
    this._Notify.error(res.error, {timeout: 0});
  } else {
  this._Notify.success(res.data, {timeout: 0});

  }

  this.form.email = null;
}
}
