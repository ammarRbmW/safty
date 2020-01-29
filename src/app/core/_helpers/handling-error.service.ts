import {TokenLocal} from './token.local';
import {Router} from '@angular/router';
import {UserLocal} from './user.local';

export class HandlingErrorService {

  constructor(public router: Router) {
  }

  redirectToLogin() {
    this.router.navigate([`/auth/login`]);
  }

}

export function handlingError(error: any, toastr: any, router1 = null) {
  const errorData = error.error;
  if (error.status === 422) {
    Object.keys(errorData.message).forEach((value) => {
      toastr.error(errorData.message[value], 'Error!');
    });
  }
  if (error.status === 401) {
    toastr.error('Unauthorized', 'Error!');
    let tokenLocal = new TokenLocal();
    let userLocal = new UserLocal();
    tokenLocal.remove();
    userLocal.remove();

    router1.navigate([`/auth/login`]);
  }
  if (error.status === 404) {
    toastr.error(errorData.message, 'Error!');
  } else {
    toastr.error(errorData.message, 'Error!');
  }
}


