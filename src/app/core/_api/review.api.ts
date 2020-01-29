import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Review} from '../_models/review';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ReviewApi {

  url: string = API_URL + '/reviews';

  constructor(
    private http: HttpClient,
  ) {
  }

  list(): Observable<any> {
    const url = API_URL + '/all_reviews';
    return this.http.get(url);
  }

  listNotApproved(): Observable<any> {
    const url = API_URL + '/not_approved_reviews';
    return this.http.get(url);
  }

  listApproved(): Observable<any> {
    const url = API_URL + '/approved_reviews';
    return this.http.get(url);
  }

  getById(reviewId): Observable<any> {
    const url = `${this.url}/${reviewId}`;
    return this.http.get(url);
  }

  create(review): Observable<any> {
    // const itemPost = {review: this.reviewDataAdapter.adapt(review)};
    return this.http.post<any>(this.url, review);
  }

  update(review): Observable<Review> {
    const url = `${this.url}/${review.id}`;
    // const itemPost = {review: this.questioqnDataAdapter.adapt(review)};
    return this.http.put<Review>(url, review).pipe();
  }

  updateAnswer(answer): Observable<Review> {
    const url = `${this.url}/${answer.id}`;
    // const itemPost = {review: this.questioqnDataAdapter.adapt(review)};
    return this.http.post<Review>(url, answer).pipe();
  }

  delete(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url).pipe();
  }

}
