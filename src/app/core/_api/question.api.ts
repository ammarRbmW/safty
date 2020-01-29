import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {Question} from '../_models/question';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class QuestionApi {

  url: string = API_URL + '/questions';

  constructor(
    private http: HttpClient,
  ) {
  }

  list(): Observable<any> {
    return this.http.get(this.url);
  }

  listNotAnswer(): Observable<any> {
    const url = API_URL + '/questions_all_not_answered';
    return this.http.get(url);
  }

  listAnswer(): Observable<any> {
    const url = API_URL + '/questions_all_answered';
    return this.http.get(url);
  }

  getById(questionId): Observable<any> {
    const url = `${this.url}/${questionId}`;
    return this.http.get(url);
  }

  create(question): Observable<any> {
    // const itemPost = {question: this.questionDataAdapter.adapt(question)};
    return this.http.post<any>(this.url, question);
  }

  update(question): Observable<Question> {
    const url = `${this.url}/${question.id}`;
    // const itemPost = {question: this.questioqnDataAdapter.adapt(question)};
    return this.http.put<Question>(url, question).pipe();
  }

  updateAnswer(answer): Observable<Question> {
    const url = `${this.url}/${answer.id}`;
    // const itemPost = {question: this.questioqnDataAdapter.adapt(question)};
    return this.http.post<Question>(url, answer).pipe();
  }

  delete(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url).pipe();
  }

}
