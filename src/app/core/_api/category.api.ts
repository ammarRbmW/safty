import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Category, CategoryAdapter, CategoryDataAdapter} from '../_models/category';
import {map} from 'rxjs/operators';
import {Product, ProductAdapter, ProductDataAdapter} from '../_models/product';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CategoryApi {

  url: string = API_URL + '/categories';

  constructor(
    private http: HttpClient,
    private categoryAdapter: CategoryAdapter,
    private categoryDataAdapter: CategoryDataAdapter,
    private productAdapter: ProductAdapter,
  ) {
  }

  list(categoryId): Observable<Category[]> {
    const url = `${this.url}/${categoryId}/children`;

    return this.http.get(url).pipe(
      map((data: any) => data.data.map(item => this.categoryAdapter.adapt(item))),
    );
  }

  listOfProducts(categoryId): Observable<Product[]> {
    const url = `${this.url}/${categoryId}/products`;

    return this.http.get(url).pipe(
      map((data: any) => data.data.map(item => this.productAdapter.adapt(item))),
    );
  }

  getById(categoryId): Observable<any> {
    const url = `${this.url}/${categoryId}`;
    return this.http.get(url);
  }

  create(category): Observable<Category> {
    const itemPost = {category: this.categoryDataAdapter.adapt(category)};
    return this.http.post<Category>(this.url, itemPost).pipe();
  }

  update(category): Observable<Category> {
    const url = `${this.url}/${category.id}`;
    const itemPost = {category: this.categoryDataAdapter.adapt(category)};
    return this.http.post<Category>(url, itemPost).pipe();
  }

  delete(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url).pipe();
  }

  addProductToCategory(categoryId, productId) {
    const url = `${this.url}/${categoryId}/products`;
    const itemPost = {
      product_id: productId
    };
    return this.http.post<any>(url, itemPost).pipe();
  }
}
