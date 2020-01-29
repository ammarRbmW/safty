import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';


import {Article, ArticleAdapter, ArticleDataAdapter} from '../_models/article';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ArticleApi {

  url: string = API_URL + '/articles';

  constructor(
    private http: HttpClient,
    private articleAdapter: ArticleAdapter,
    private articleDataAdapter: ArticleDataAdapter,
  ) {
  }

  list(): Observable<Article[]> {
    const url = `${this.url}`;

    return this.http.get(this.url).pipe(
      map((data: any) => data.data.map(item => this.articleAdapter.adapt(item))),
    );
  }

  getById(articleId): Observable<any> {
    const url = `${this.url}/${articleId}`;
    return this.http.get(url);
  }

  create(article): Observable<Article> {
    const itemPost = {article: this.articleDataAdapter.adapt(article)};
    return this.http.post<Article>(this.url, itemPost).pipe();
  }

  update(article): Observable<Article> {
    const url = `${this.url}/${article.id}`;
    const itemPost = {article: this.articleDataAdapter.adapt(article)};
    return this.http.put<Article>(url, itemPost).pipe();
  }

  delete(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url).pipe();
  }

}
