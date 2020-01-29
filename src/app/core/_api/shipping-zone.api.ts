import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';


import {ShippingZone, ShippingZoneAdapter, ShippingZoneDataAdapter} from '../_models/shipping-zone';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ShippingZoneApi {

  url: string = API_URL + '/shipping_zones';

  constructor(
    private http: HttpClient,
    private shippingZoneAdapter: ShippingZoneAdapter,
    private shippingZoneDataAdapter: ShippingZoneDataAdapter,
  ) {
  }

  list(): Observable<ShippingZone[]> {
    const url = `${this.url}`;

    return this.http.get(this.url).pipe(
      map((data: any) => data.data.map(item => this.shippingZoneAdapter.adapt(item))),
    );
  }

  getById(shippingZoneId): Observable<any> {
    const url = `${this.url}/${shippingZoneId}`;
    return this.http.get(url);
  }

  create(shippingZone): Observable<ShippingZone> {
    const itemPost = {shipping_zone: this.shippingZoneDataAdapter.adapt(shippingZone)};
    return this.http.post<ShippingZone>(this.url, itemPost).pipe();
  }

  update(shippingZone): Observable<ShippingZone> {
    const url = `${this.url}/${shippingZone.id}`;
    const itemPost = {shipping_zone: this.shippingZoneDataAdapter.adapt(shippingZone)};
    return this.http.put<ShippingZone>(url, itemPost).pipe();
  }

  delete(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url).pipe();
  }

}
