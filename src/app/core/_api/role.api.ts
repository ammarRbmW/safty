import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Role} from '../_models/role';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class RoleApi {

  url: string = API_URL + '/roles';

  constructor(
    private http: HttpClient
  ) {
  }

  list(): Observable<any> {
    return this.http.get(this.url);
  }

  getById(roleId): Observable<any> {
    const url = `${this.url}/${roleId}`;
    return this.http.get(url);
  }

  getUsersRole(roleId): Observable<any> {
    const url = `${this.url}/${roleId}/users`;
    return this.http.get(url);
  }

  create(role): Observable<Role> {
    return this.http.post<Role>(this.url, role).pipe();
  }

  update(role): Observable<Role> {
    const url = `${this.url}/${role.id}`;
    return this.http.put<Role>(url, role).pipe();
  }

  delete(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url).pipe();
  }

}
