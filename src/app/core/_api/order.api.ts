import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';


import {Order, OrderAdapter, OrderDataAdapter} from '../_models/order';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class OrderApi {

  url: string = API_URL + '/admin/orders';
  changeStatusUrl: string = API_URL + '/admin/orders_statuses';

  constructor(
    private http: HttpClient,
  ) {
  }

  list(page = null, per_page = null): Observable<any> {
    let url = `${this.url}`;
    if (page) {
      url = `${this.url}?page=${page}&per_page=${per_page}`;
    }
    return this.http.get(url).pipe();
  }

  getById(orderId): Observable<any> {
    const url = `${this.url}/${orderId}`;

    return this.http.get(url);
  }

  changeStatus(orderId, statusId): Observable<any> {
    const url = `${this.url}/${orderId}/change_status`;

    return this.http.post<any>(url, {status_id: statusId}).pipe();
  }

  listStatus(): Observable<any> {
    const url = `${this.changeStatusUrl}`;

    return this.http.get<any>(url);
  }

}
