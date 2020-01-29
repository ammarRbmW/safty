import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';


import {Page, PageAdapter, PageDataAdapter} from '../_models/page';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PageApi {

  url: string = API_URL + '/article_pages';

  constructor(
    private http: HttpClient,
    private pageAdapter: PageAdapter,
    private pageDataAdapter: PageDataAdapter,
  ) {
  }

  list(): Observable<Page[]> {
    const url = `${this.url}`;

    return this.http.get(this.url).pipe(
      map((data: any) => data.data.map(item => this.pageAdapter.adapt(item))),
    );
  }

  getById(pageId): Observable<any> {
    const url = `${this.url}/${pageId}`;
    return this.http.get(url);
  }

  create(page): Observable<Page> {
    const itemPost = {article_page: this.pageDataAdapter.adapt(page)};
    return this.http.post<Page>(this.url, itemPost).pipe();
  }

  update(page): Observable<Page> {
    const url = `${this.url}/${page.id}`;
    const itemPost = {article_page: this.pageDataAdapter.adapt(page)};
    return this.http.put<Page>(url, itemPost).pipe();
  }

  delete(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url).pipe();
  }

}
