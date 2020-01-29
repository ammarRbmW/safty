import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {User} from '../_models/user';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserApi {

  url: string = API_URL + '/users';

  constructor(
    private http: HttpClient
  ) {
  }

  list(): Observable<any> {
    return this.http.get(this.url);
  }

  allUsers(page = null, per_page = null): Observable<any> {
    let url = `${this.url}/all`;
    if (page) {
      url = `${this.url}/all?page=${page}&per_page=${per_page}`;
    }
    return this.http.get(url).pipe();
  }

  getById(userId): Observable<any> {
    const url = `${this.url}/${userId}`;
    return this.http.get(url);
  }

  create(user): Observable<User> {
    return this.http.post<User>(this.url, user).pipe();
  }

  update(user): Observable<User> {
    const url = `${this.url}/${user.id}`;
    return this.http.put<User>(url, user).pipe();
  }

  updateUserRoles(userId, userRoles): Observable<any> {
    const url = `${this.url}/${userId}/roles`;
    return this.http.post<any>(url, {roles: userRoles}).pipe();
  }

  delete(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url).pipe();
  }

  getUsersRole(userId): Observable<any> {
    const url = `${this.url}/${userId}/roles`;
    return this.http.get(url);
  }

}
