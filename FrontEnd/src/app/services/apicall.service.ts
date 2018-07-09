import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApicallService {
private baseUrl = 'http://localhost:8000/api';
  constructor(private _http: HttpClient) { }

  signup(data) {
    return this._http.post(`${this.baseUrl}/signup`, data);
  }

  login(data) {
    return this._http.post(`${this.baseUrl}/login`, data);
  }

  sendPasswordResetLink(data) {
    return this._http.post(`${this.baseUrl}/sendPasswordLink`, data);
  }
  changePassword(data) {
    return this._http.post(`${this.baseUrl}/resetPassword`, data);

  }

}
