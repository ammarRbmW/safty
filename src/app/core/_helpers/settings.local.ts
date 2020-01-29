import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SettingsLocal {
  settings = {
    lang: 'en',
    smallSideBar: false,
    theme: 'dark',
    mainColor: 'blue'
  };

  constructor() {
  }

  set(setting) {
    localStorage.setItem('setting', JSON.stringify(setting));
  }

  get() {

    if (localStorage.getItem('setting') == null ||
      localStorage.getItem('setting') === undefined ||
      localStorage.getItem('setting') == 'undefined') {
      this.set(this.settings);
      return JSON.parse(localStorage.getItem('setting'));
    } else {
      return JSON.parse(localStorage.getItem('setting'));
    }
  }

  remove() {
    localStorage.removeItem('setting');
  }
}
