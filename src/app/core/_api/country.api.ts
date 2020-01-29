import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';


import {Country, CountryAdapter, CountryDataAdapter} from '../_models/country';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CountryApi {

  url: string = API_URL + '/countries';

  constructor(
    private http: HttpClient,
    private countryAdapter: CountryAdapter,
    private countryDataAdapter: CountryDataAdapter,
  ) {
  }

  list(): Observable<Country[]> {
    const url = `${this.url}`;

    return this.http.get(this.url).pipe(
      map((data: any) => data.data.map(item => this.countryAdapter.adapt(item))),
    );
  }

  getById(countryId): Observable<any> {
    const url = `${this.url}/${countryId}`;
    return this.http.get(url);
  }

  create(country): Observable<Country> {
    const itemPost = {country: this.countryDataAdapter.adapt(country)};
    return this.http.post<Country>(this.url, itemPost).pipe();
  }

  update(country): Observable<Country> {
    const url = `${this.url}/${country.id}`;
    const itemPost = {country: this.countryDataAdapter.adapt(country)};
    return this.http.put<Country>(url, itemPost).pipe();
  }

  delete(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url).pipe();
  }

}
