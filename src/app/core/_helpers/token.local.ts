import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TokenLocal {
  public httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type': 'application/json',
      // 'Accept-Language': 'en, ar',
      Authorization: ''
    })
  };

  constructor() {
    this.setHttpOptions();
  }

  handle(token) {
    const Token = 'Bearer ' + token.access_token;
    this.set(Token);
    this.setHttpOptions();
  }

  set(token) {
    localStorage.setItem('token', token);
  }

  get() {
    return localStorage.getItem('token');
  }

  remove() {
    localStorage.removeItem('token');
  }

  setHttpOptions() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: this.get(),
      })
    };
  }

  getHttpOptions() {
    return this.httpOptions;
  }

  removeHttpOptions() {
    this.httpOptions = null;
  }

  isValid() {

    return false;
  }

  payload(token) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload) {
    return JSON.parse(atob(payload));
  }

  loggedIn() {
    const hasToken = this.get();
    if (hasToken) {
      return true;
    } else {
      return false;
    }
    // return this.isValid();
  }
}
