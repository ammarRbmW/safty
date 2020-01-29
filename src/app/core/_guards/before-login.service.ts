import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {TokenLocal} from '../_helpers/token.local';
import {Observable} from 'rxjs';
import {AuthenticationApi} from '../_api';


@Injectable({providedIn: 'root'})
export class BeforeLoginService implements CanActivate {

  constructor(
    private authenticationApi: AuthenticationApi,
    private tokenService: TokenLocal,
    private router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {


    // if (!this.tokenService.loggedIn()) {
    const currentUser = this.authenticationApi.currentUserValue;
    if (!currentUser) {
      return true;
    } else {
      this.router.navigate(['/home']);
    }

  }
}


