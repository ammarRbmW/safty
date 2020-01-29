import {Component, Input, OnInit} from '@angular/core';
import {UploadFileService} from '../../../core/_api/upload-file.service';

import {environment} from '../../../../environments/environment';
import {FormGroup, FormBuilder} from '@angular/forms';

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  public form: FormGroup;

  @Input() field: string;
  @Input() theForm: FormGroup;

  quill: any;
  editor;
  returnedURL;
  urlImage = API_URL + '/upload/editor';

  constructor(
    public uploadService: UploadFileService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.form = this.theForm;
  }

  EditorCreated(quill) {
    const toolbar = quill.getModule('toolbar');
    toolbar.addHandler('image', this.imageHandler.bind(this));
    this.editor = quill;
  }

  imageHandler() {
    const Imageinput = document.createElement('input');
    Imageinput.setAttribute('type', 'file');
    Imageinput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
    Imageinput.classList.add('ql-image');
    Imageinput.addEventListener('change', () => {
      const file = Imageinput.files[0];
      if (Imageinput.files != null && Imageinput.files[0] != null) {
        this.uploadService.postFile(this.urlImage, file).subscribe((data: any) => {
          this.returnedURL = API_URL + '/' + data.data[0];
          this.pushImageToEditor();
        });
      }
    });

    Imageinput.click();
  }

  pushImageToEditor() {
    const range = this.editor.getSelection(true);
    const index = range.index + range.length;
    this.editor.insertEmbed(range.index, 'image', this.returnedURL);
  }
}
