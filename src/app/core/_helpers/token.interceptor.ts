import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationApi} from '../_api';
import {environment} from '../../../environments/environment';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationApi) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const URL = request.url;
    const UPLOAD_URL = '/api/upload/';
    if (URL.includes(UPLOAD_URL)) {
      return next.handle(request);
    }

    request = request.clone({
      withCredentials: true,
      setHeaders: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Accept-Language': 'en, ar',
      }
    });

    let currentUser: any;
    currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.access_token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.access_token}`
        }
      });
    }
    return next.handle(request);
  }
}



