import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';


import {Currency, CurrencyAdapter, CurrencyDataAdapter} from '../_models/currency';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CurrencyApi {

  url: string = API_URL + '/currency';

  constructor(
    private http: HttpClient,
    private currencyAdapter: CurrencyAdapter,
    private currencyDataAdapter: CurrencyDataAdapter,
  ) {
  }

  list(): Observable<Currency[]> {
    const url = `${this.url}`;

    return this.http.get(this.url).pipe(
      map((data: any) => data.data.map(item => this.currencyAdapter.adapt(item))),
    );
  }

  getById(currencyId): Observable<any> {
    const url = `${this.url}/${currencyId}`;
    return this.http.get(url);
  }

  create(currency): Observable<Currency> {
    const itemPost = {currency: this.currencyDataAdapter.adapt(currency)};
    return this.http.post<Currency>(this.url, itemPost).pipe();
  }

  update(currency): Observable<Currency> {
    const url = `${this.url}/${currency.id}`;
    const itemPost = {currency: this.currencyDataAdapter.adapt(currency)};
    return this.http.put<Currency>(url, itemPost).pipe();
  }

  delete(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url).pipe();
  }

}
