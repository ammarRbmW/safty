import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {TokenLocal} from '../_helpers/token.local';

const API_URL = environment.apiUrl;

@Injectable({providedIn: 'root'})


export class UploadFileService {

  constructor(private http: HttpClient, public tokenService: TokenLocal) {
  }

  removeFile(fileName, url) {
    const urlTemp = API_URL + `/` + url;
    return this.http.post<any>(urlTemp, {file: fileName}, this.tokenService.getHttpOptions()).pipe();
  }


  postFile(folderUpload, fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', fileToUpload, fileToUpload.name);
    return this.http.post(folderUpload, formData);
  }


  afterUpload(imageUpload, data) {
    imageUpload.oldImage = API_URL + data.data[0];
    imageUpload.upload_image_disable = true;
    imageUpload.configImage.File = null;
    imageUpload.configImage.ImageUrl = null;
    imageUpload.showSpinnerImage = false;
    return imageUpload;
  }

  postFile1(url, fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.type);

    return this.http.post(url, formData, {
      reportProgress: true,
      // @ts-ignore
      headers: this.tokenService.getHttpOptions()
    });
  }


  readURL(event: any, configImage, dialog, openDialogImage, type: any): void {
    configImage.File = event;
    setTimeout(() => {
      const dialogRef = dialog.open(openDialogImage);
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    });
  }

}

export interface FileName {
  path: any;
}


