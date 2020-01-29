import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Catalog, CatalogAdapter, CatalogDataAdapter} from '../_models/catalog';
import {map} from 'rxjs/operators';
import {ProductAdapter, ProductDataAdapter} from '../_models/product';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CatalogApi {

  url: string = API_URL + '/catalogs';

  constructor(
    private http: HttpClient,
    private catalogAdapter: CatalogAdapter,
    private catalogDataAdapter: CatalogDataAdapter,
  ) {
  }

  list(): Observable<Catalog[]> {
    const url = `${this.url}`;

    return this.http.get(this.url).pipe(
      map((data: any) => data.data.map(item => this.catalogAdapter.adapt(item))),
    );
  }

  getById(catalogId): Observable<any> {
    const url = `${this.url}/${catalogId}`;
    return this.http.get(url);
  }

  create(catalog): Observable<Catalog> {
    const itemPost = {catalog: this.catalogDataAdapter.adapt(catalog)};
    return this.http.post<Catalog>(this.url, itemPost).pipe();
  }

  update(catalog): Observable<Catalog> {
    const url = `${this.url}/${catalog.id}`;
    const itemPost = {catalog: this.catalogDataAdapter.adapt(catalog)};
    return this.http.put<Catalog>(url, itemPost).pipe();
  }

  delete(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url).pipe();
  }

}
