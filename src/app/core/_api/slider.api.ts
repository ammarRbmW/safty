import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';


import {Slider, SliderAdapter, SliderDataAdapter} from '../_models/slider';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class SliderApi {

  url: string = API_URL + '/sliders';

  constructor(
    private http: HttpClient,
    private sliderAdapter: SliderAdapter,
    private sliderDataAdapter: SliderDataAdapter,
  ) {
  }

  list(): Observable<Slider[]> {
    const url = `${this.url}`;

    return this.http.get(this.url).pipe(
      map((data: any) => data.data.map(item => this.sliderAdapter.adapt(item))),
    );
  }

  getById(sliderId): Observable<any> {
    const url = `${this.url}/${sliderId}`;
    return this.http.get(url);
  }

  create(slider): Observable<Slider> {
    const itemPost = {slider: this.sliderDataAdapter.adapt(slider)};
    return this.http.post<Slider>(this.url, itemPost).pipe();
  }

  update(slider): Observable<Slider> {
    const url = `${this.url}/${slider.id}`;
    const itemPost = {slider: this.sliderDataAdapter.adapt(slider)};
    return this.http.put<Slider>(url, itemPost).pipe();
  }

  delete(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url).pipe();
  }

}
