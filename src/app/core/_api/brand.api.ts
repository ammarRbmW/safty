import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Brand, BrandAdapter, BrandDataAdapter} from '../_models/brand';
import {map} from 'rxjs/operators';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class BrandApi {

  url: string = API_URL + '/brands';

  constructor(
    private http: HttpClient,
    private brandAdapter: BrandAdapter,
    private brandDataAdapter: BrandDataAdapter,
  ) {
  }

  list(): Observable<Brand[]> {
    const url = `${this.url}`;

    return this.http.get(url).pipe(
      map((data: any) => data.data.map(item => this.brandAdapter.adapt(item))),
    );
  }

  getById(brandId): Observable<any> {
    const url = `${this.url}/${brandId}`;
    return this.http.get(url);
  }

  create(brand): Observable<Brand> {
    const itemPost = {brand: this.brandDataAdapter.adapt(brand)};
    return this.http.post<Brand>(this.url, itemPost).pipe();
  }

  update(brand): Observable<Brand> {
    const url = `${this.url}/${brand.id}`;
    const itemPost = {brand: this.brandDataAdapter.adapt(brand)};
    return this.http.patch<Brand>(url, itemPost).pipe();
  }

  delete(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url).pipe();
  }

}
