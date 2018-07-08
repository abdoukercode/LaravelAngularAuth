import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../../services/apicall.service';

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
constructor(private _service: ApicallService) { }

  ngOnInit() {
  }


  onSubmit() {

    this._service.signup(this.form).subscribe(
          data => console.log(data),
          error => this.handleError(error));
  }
  handleError(error) {
    this.error = error.error.errors;
  }

}
