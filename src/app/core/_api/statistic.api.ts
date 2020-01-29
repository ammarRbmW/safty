import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Size, SizeAdapter, SizeDataAdapter} from '../_models/size';
import {map} from 'rxjs/operators';
import {User} from '../_models';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class StatisticApi {

  url: string = API_URL + '/statistic/all';

  constructor(
    private http: HttpClient,
  ) {
  }
  get(number=1, dateType = 'm'): Observable<User> {
    const url = `${this.url}/${number}/${dateType}`;
    return this.http.get<User>(url);
  }

}
