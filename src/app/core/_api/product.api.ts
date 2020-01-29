import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Product, ProductAdapter, ProductDataAdapter} from '../_models/product';
import {map} from 'rxjs/operators';
import {Catalog} from '../_models/catalog';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ProductApi {

  url: string = API_URL + '/products';
  listUrl: string = API_URL + '/categories';
  catalogUrl: string = API_URL + '/catalogs';

  constructor(
    private http: HttpClient,
    private productAdapter: ProductAdapter,
    private productDataAdapter: ProductDataAdapter,
  ) {
  }

  list(productId): Observable<Product[]> {
    const url = `${this.listUrl}/${productId}/products`;

    return this.http.get(url).pipe(
      map((data: any) => data.data.map(item => this.productAdapter.adapt(item))),
    );
  }

  getById(productId): Observable<any> {
    const url = `${this.url}/${productId}`;
    return this.http.get(url);
  }

  getProductsByCatalogId(catalogId): Observable<any> {
    const url = `${this.catalogUrl}/${catalogId}/products`;
    return this.http.get(url).pipe(
      map((data: any) => data.data.map(item => this.productAdapter.adapt(item))),
    );
  }

  addProductToCatalog(catalogId, productId): Observable<any> {
    const url = `${this.catalogUrl}/${catalogId}/products`;

    const itemPost = {
      product_id: productId
    };

    return this.http.post<any>(url, itemPost).pipe();
  }

  create(product): Observable<Product> {
    const itemPost = {product: this.productDataAdapter.adapt(product)};
    return this.http.post<Product>(this.url, itemPost).pipe();
  }

  update(product): Observable<Product> {
    const url = `${this.url}/${product.id}`;
    const itemPost = {product: this.productDataAdapter.adapt(product)};

    return this.http.patch<Product>(url, itemPost).pipe();
  }

  delete(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url).pipe();
  }

  getAll(): Observable<Product[]> {
    return this.http.get(this.url).pipe(
      map((data: any) => data.data.map(item => this.productAdapter.adapt(item))),
    );
  }

  createProductImage(productId, imageUrl) {
    const itemPost = {url: imageUrl};
    const url = this.url + '/image/' + productId;
    return this.http.post<any>(url, itemPost).pipe();
  }

  deleteProductImage(imageId) {
    const itemPost = {image_id: imageId};
    const url = API_URL + '/products_image';

    return this.http.post<any>(url, itemPost).pipe();
  }

  relatedProductsList(productId) {
    const url = this.url + '/' + productId + '/related';
    return this.http.get(url).pipe(
      map((data: any) => data.data.map(item => this.productAdapter.adapt(item))),
    );
  }

  createRelatedProduct(productId, relatedProductId) {
    const itemPost = {related_product_id: relatedProductId};
    const url = this.url + '/' + productId + '/related';
    return this.http.post<any>(url, itemPost).pipe();
  }

  deleteRelatedProduct(imageId) {
    const itemPost = {image_id: imageId};
    const url = API_URL + '/products_image';

    return this.http.post<any>(url, itemPost).pipe();
  }
}
