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
  constructor(private _service: ApicallService, private _notify: SnotifyService) { }

  ngOnInit() {
  }

onSubmit() {
  this._service.sendPasswordResetLink(this.form).subscribe(
    data => this.handleResponse(data),
    error => this._notify.error(error.error.error)
  );
}
handleResponse(res) {
  console.log(res);
  this.form.email = null;
}
}
