import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';


import {Ad, AdAdapter, AdDataAdapter} from '../_models/ad';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AdApi {

  url: string = API_URL + '/news';

  constructor(
    private http: HttpClient,
    private adAdapter: AdAdapter,
    private adDataAdapter: AdDataAdapter,
  ) {
  }

  list(): Observable<Ad[]> {
    const url = `${this.url}`;

    return this.http.get(this.url).pipe(
      map((data: any) => data.data.map(item => this.adAdapter.adapt(item))),
    );
  }

  getById(adId): Observable<any> {
    const url = `${this.url}/${adId}`;
    return this.http.get(url);
  }

  create(ad): Observable<Ad> {
    const itemPost = {advertisement: this.adDataAdapter.adapt(ad)};
    return this.http.post<Ad>(this.url, itemPost).pipe();
  }

  update(ad): Observable<Ad> {
    const url = `${this.url}/${ad.id}`;
    const itemPost = {advertisement: this.adDataAdapter.adapt(ad)};
    return this.http.put<Ad>(url, itemPost).pipe();
  }

  delete(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url).pipe();
  }

}
