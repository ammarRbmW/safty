import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Coupon, CouponAdapter, CouponDataAdapter} from '../_models/coupon';
import {map} from 'rxjs/operators';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CouponApi {

  url: string = API_URL + '/coupons';

  constructor(
    private http: HttpClient,
    private couponAdapter: CouponAdapter,
    private couponDataAdapter: CouponDataAdapter,
  ) {
  }

  list(): Observable<Coupon[]> {
    const url = `${this.url}`;

    return this.http.get(this.url).pipe(
      map((data: any) => data.data.map(item => this.couponAdapter.adapt(item))),
    );
  }

  getById(couponId): Observable<any> {
    const url = `${this.url}/${couponId}`;
    return this.http.get(url);
  }

  create(coupon): Observable<Coupon> {
    const itemPost = {coupon: this.couponDataAdapter.adapt(coupon)};
    return this.http.post<Coupon>(this.url, itemPost).pipe();
  }

  update(coupon): Observable<Coupon> {
    const url = `${this.url}/${coupon.id}`;
    const itemPost = {coupon: this.couponDataAdapter.adapt(coupon)};
    return this.http.put<Coupon>(url, itemPost).pipe();
  }

  delete(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url).pipe();
  }

}
