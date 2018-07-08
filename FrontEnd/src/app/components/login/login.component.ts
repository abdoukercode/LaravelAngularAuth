import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../../services/apicall.service';


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
  constructor(private _service: ApicallService) { }

  ngOnInit() {
  }


  onSubmit() {
    return this._service.login(this.form)
      .subscribe(
          data => console.log(data),
          error => this.handleError(error));
  }
  handleError(error) {
    this.error = error.error.error;
  }
}

