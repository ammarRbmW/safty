import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Color, ColorAdapter, ColorDataAdapter} from '../_models/color';
import {map} from 'rxjs/operators';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ColorApi {

  url: string = API_URL + '/colors';

  constructor(
    private http: HttpClient,
    private colorAdapter: ColorAdapter,
    private colorDataAdapter: ColorDataAdapter,
  ) {
  }

  list(): Observable<Color[]> {
    const url = `${this.url}`;

    return this.http.get(url).pipe(
      map((data: any) => data.data.map(item => this.colorAdapter.adapt(item))),
    );
  }

  getById(colorId): Observable<any> {
    const url = `${this.url}/${colorId}`;
    return this.http.get(url);
  }

  create(color): Observable<Color> {
    const itemPost = {color: this.colorDataAdapter.adapt(color)};

    return this.http.post<Color>(this.url, itemPost).pipe();
  }

  update(color): Observable<Color> {
    const url = `${this.url}/${color.id}`;
    const itemPost = {color: this.colorDataAdapter.adapt(color)};
    return this.http.patch<Color>(url, itemPost).pipe();
  }

  delete(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url).pipe();
  }

}
