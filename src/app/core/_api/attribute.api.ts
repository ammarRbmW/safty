import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Attribute, AttributeAdapter, AttributeDataAdapter} from '../_models/attribute';
import {map} from 'rxjs/operators';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AttributeApi {

  url: string = API_URL + '/products/attributes';

  constructor(
    private http: HttpClient,
    private attributeAdapter: AttributeAdapter,
    private attributeDataAdapter: AttributeDataAdapter,
  ) {
  }

  list(): Observable<Attribute[]> {
    const url = `${this.url}`;

    return this.http.get(this.url).pipe(
      map((data: any) => data.data.map(item => this.attributeAdapter.adapt(item))),
    );
  }

  getById(attributeId): Observable<any> {
    const url = `${this.url}/${attributeId}`;
    return this.http.get(url);
  }

  create(attribute): Observable<Attribute> {
    const itemPost = {attribute: this.attributeDataAdapter.adapt(attribute)};
    return this.http.post<Attribute>(this.url, itemPost).pipe();
  }

  update(attribute): Observable<Attribute> {
    const url = `${this.url}/${attribute.id}`;
    const itemPost = {attribute: this.attributeDataAdapter.adapt(attribute)};
    return this.http.put<Attribute>(url, itemPost).pipe();
  }

  delete(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url).pipe();
  }

}
