import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {User} from '../_models';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class SolutionService {
  private url = API_URL + `/solution`;

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.url
    );
  }

  getImage(imageUrl: string): Observable<Blob> {
    return this.http.get(imageUrl, {responseType: 'blob'});
  }

  create(item: User): Observable<User> {
    return this.http.post<User>(this.url, item).pipe();
  }

  get(id): Observable<User> {
    const url = `${this.url}/${id}`;
    return this.http.get<User>(url);
  }

  update(item: User): Observable<User> {
    const url = `${this.url}/${item.id}/update`;
    return this.http.post<User>(url, item).pipe();
  }


  sort(item: User): Observable<User[]> {
    const url = API_URL + `/sort?model=Solution`;
    return this.http.post<User[]>(url, item).pipe();
  }

  delete(id: number): Observable<{}> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url).pipe();
  }

  onUpload(files, url) {
    this.http.post(url, files).subscribe((data: any) => {
      console.log(data);
    });
  }

  postFile(url, fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, 'file.jpg');
    return this.http.post(url, formData);
  }

}

