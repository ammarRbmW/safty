import {Injectable} from '@angular/core';
import {User} from '../_models';
import {TokenLocal} from './token.local';


@Injectable({
  providedIn: 'root'
})
export class UserLocal {
  constructor() {
  }

  handle(user) {
    this.set(user);
  }

  set(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  get() {
    if (localStorage.getItem('currentUser') == null || localStorage.getItem('user') === undefined || localStorage.getItem('user') == 'undefined') {
    } else {
      return JSON.parse(localStorage.getItem('currentUser'));
    }
  }

  remove() {
    localStorage.removeItem('currentUser');
  }
}
