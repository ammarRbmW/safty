import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

@Component({
  selector: 'app-upload-card',
  templateUrl: './upload-card.component.html',
  styleUrls: ['./upload-card.component.css']
})
export class UploadCardComponent implements OnInit {
  @Input() oldImage: string;
  @Input() showSpinner: false;
  @Input() elementId = 'elementId';
  @Input() imageName: string;
  @Output() newFile: EventEmitter<any> = new EventEmitter();
  @Output() newFileEvent = new EventEmitter<string>();
  @Output() editFileEvent = new EventEmitter<string>();
  @Output() readURLEvent = new EventEmitter<string>();

  public uploader: FileUploader = new FileUploader({ url: '', itemAlias: 'photo' });

  constructor() {

  }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded:', item, status, response);
      alert('File uploaded successfully');
    };
  }

  _newFileEvent() {
    document.getElementById(this.elementId).click();

    this.newFileEvent.emit();
  }

  _editFileEvent(data: string) {
    this.editFileEvent.emit(data);
  }

  _readURLEvent(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      let imageSrc: any;
      const reader = new FileReader();
      reader.onload = e => imageSrc = reader.result;
      reader.readAsDataURL(file);
      this.readURLEvent.emit(file);
    }
  }
}
