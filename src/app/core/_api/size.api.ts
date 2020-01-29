import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Size, SizeAdapter, SizeDataAdapter} from '../_models/size';
import {map} from 'rxjs/operators';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class SizeApi {

  url: string = API_URL + '/sizes';

  constructor(
    private http: HttpClient,
    private sizeAdapter: SizeAdapter,
    private sizeDataAdapter: SizeDataAdapter,
  ) {
  }

  list(): Observable<Size[]> {
    const url = `${this.url}`;

    return this.http.get(url).pipe(
      map((data: any) => data.data.map(item => this.sizeAdapter.adapt(item))),
    );
  }

  getById(sizeId): Observable<any> {
    const url = `${this.url}/${sizeId}`;
    return this.http.get(url);
  }

  create(size): Observable<Size> {
    const itemPost = {size: this.sizeDataAdapter.adapt(size)};
    return this.http.post<Size>(this.url, itemPost).pipe();
  }

  update(size): Observable<Size> {
    const url = `${this.url}/${size.id}`;
    const itemPost = {size: this.sizeDataAdapter.adapt(size)};
    return this.http.patch<Size>(url, itemPost).pipe();
  }

  delete(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url).pipe();
  }

}
