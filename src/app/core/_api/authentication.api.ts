import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../_models';
import {environment} from '../../../environments/environment';
import {UserLocal} from '../_helpers/user.local';
import {TokenLocal} from '../_helpers/token.local';

const API_URL = environment.apiUrl;

@Injectable({providedIn: 'root'})
export class AuthenticationApi {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  public loginUrl = API_URL + `/login`;
  public signupUrl = API_URL + `/signup`;

  constructor(private http: HttpClient,
              private userLocal: UserLocal, private tokenLocal: TokenLocal) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(userInfo) {
    return this.http.post<any>(this.loginUrl, userInfo)
      .pipe(map(data => {
        // login successful if there's a jwt token in the response
        if (data && data.access_token) {
          const userToken = data.user;
          userToken.access_token = data.access_token
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(userToken));
          this.currentUserSubject.next(userToken);
        }
        return data;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    this.userLocal.remove();
    this.tokenLocal.remove();
    this.tokenLocal.removeHttpOptions();
    this.currentUserSubject.next(null);
  }

  signup(user): Observable<User> {
    return this.http.post<User>(this.signupUrl, user).pipe();
  }
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  remember_me: boolean;
  created_at: Date;
  updated_at: Date;
}
