import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {User} from '../_models';
import {TokenLocal} from '../_helpers/token.local';
import {AuthenticationApi} from './authentication.api';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public usersUrl = API_URL + `/profile`;

  constructor(
    private http: HttpClient, private tokenService: TokenLocal, private authService: AuthenticationApi) {
  }

  profile(): Observable<any[]> {
    return this.http.get<any[]>(this.usersUrl, this.tokenService.getHttpOptions());
  }
}
