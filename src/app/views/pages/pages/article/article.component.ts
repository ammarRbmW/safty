import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material';
import {handlingError} from '../../../../core/_helpers/handling-error.service';
import {ControlPageService} from '../../../../core/_helpers/control-page.service';
import {Article, ArticleAdapter, ArticleDataAdapter} from '../../../../core/_models/article';
import {ArticleApi} from '../../../../core/_api/article.api';
import {UploadFileService} from '../../../../core/_api';
import {environment} from '../../../../../environments/environment';
import * as _moment from 'moment';

const moment = _moment;

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
})
export class ArticleComponent implements OnInit {
  routeName = 'articles';
  public form: FormGroup;
  apiUrl = environment.apiUrl;
  uploadImageUrl = this.apiUrl + '/upload/articles';

  id: any;
  articlePageId: number;
  image: any;
  isItemEdit = false;
  isLoading = false;
  article: Article;

  @ViewChild('openDialogImage', {static: false}) openDialogImage: TemplateRef<any>;
  fileImage: File;
  fixedWidth = '412';
  fixedHeight = '275';
  public imageUpload: any = {
    oldImage: '',
    upload_image_disable: true,
    showSpinnerImage: false,
    configImage: {
      ImageName: 'Article Image',
      AspectRatios: ['Default'],
      File: this.fileImage,
      ImageType: 'image/jpeg'
    }
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private controlPageService: ControlPageService,
    private uploadService: UploadFileService,
    private toastr: ToastrService,
    private articleApi: ArticleApi,
    private articleAdapter: ArticleAdapter,
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.setBreadcrumbs();
    this.form = this.fb.group({
      titleEn: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])],
      titleAr: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],

      descriptionEn: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])],
      descriptionAr: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],

      tagsEn: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])],
      tagsAr: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],

      textEn: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])],
      textAr: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],
      date: [null, Validators.compose([Validators.minLength(2), Validators.maxLength(50)])],
      active: [true],
    });

    this.route.params.subscribe(params => {
      this.articlePageId = params.articlePageId;
      if (this.router.url.includes('/create')) {
      } else {
        this.id = params.articleId;
        this.isItemEdit = true;
        this.get();
      }
    });

  }

  get() {

    this.articleApi.getById(this.id).subscribe((data: any) => {
        this.article = this.articleAdapter.adapt(data.data);
        this.form.controls.titleEn.setValue(this.article.titleEn);
        this.form.controls.titleAr.setValue(this.article.titleAr);
        this.form.controls.descriptionEn.setValue(this.article.descriptionEn);
        this.form.controls.descriptionAr.setValue(this.article.descriptionAr);
        this.form.controls.textEn.setValue(this.article.textEn);
        this.form.controls.textAr.setValue(this.article.textAr);
        this.form.controls.tagsEn.setValue(this.article.tagsEn);
        this.form.controls.tagsAr.setValue(this.article.tagsAr);
        this.form.controls.date.setValue(this.article.date);
        this.id = this.article.id;
        this.imageUpload.oldImage = this.apiUrl + this.article.mainImage;

      },
      (error: any) => {
        handlingError(error, this.toastr, this.router);
      },
      () => {
        this.setBreadcrumbs();
      });
  }

  store() {

    const dateFormat = moment(this.form.controls.date.value).format('YYYY-MM-DD');

    const article = {
      articlePageId: this.articlePageId,
      titleEn: this.form.controls.titleEn.value,
      titleAr: this.form.controls.titleAr.value,
      descriptionEn: this.form.controls.descriptionEn.value,
      descriptionAr: this.form.controls.descriptionAr.value,
      textEn: this.form.controls.textEn.value,
      textAr: this.form.controls.textAr.value,
      tagsEn: this.form.controls.tagsEn.value,
      tagsAr: this.form.controls.tagsAr.value,
      date: dateFormat,
      mainImage: this.image,

    };

    this.isLoading = true;
    if (this.isItemEdit) {
      this.update(article);
    } else {
      this.create(article);
    }
    this.isLoading = false;
  }

  create(article) {
    this.articleApi.create(article).subscribe((data: any) => {
        this.form.reset();
        this.toastr.success('Item updated successfully.', 'Success');
        this.router.navigate([`/pages/` + this.routeName + '/' + this.articlePageId]);
      },
      (error: any) => {
        handlingError(error, this.toastr, this.router);
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      });
  }

  update(article) {

    article.id = this.id;
    this.articleApi.update(article).subscribe((data: any) => {
        this.form.reset();
        this.toastr.success('Item updated successfully', 'success!');
        this.router.navigate([`/pages/` + this.routeName + '/' + this.articlePageId]);
      },
      (error: any) => {
        handlingError(error, this.toastr, this.router);
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      });
  }


  setBreadcrumbs() {
    const breadcrumbArray = [];
    breadcrumbArray[0] = {label: 'Home', url: '/home', params: []};
    breadcrumbArray[1] = {label: this.routeName, url: '/' + this.routeName, params: []};
    breadcrumbArray[2] = {
      label: this.isItemEdit ? 'Update ' + this.routeName : 'Create ' + this.routeName,
      url: '',
      params: []
    };
    this.controlPageService.setBreadcrumb(breadcrumbArray);

  }

  readURL(event: any, type: any): void {
    this.uploadService.readURL(event, this.imageUpload.configImage, this.dialog, this.openDialogImage, type);
  }

  public getEditedFile(file: File, type: any) {
    this.imageUpload.showSpinnerImage = true;
    this.uploadService.postFile(this.uploadImageUrl, file).subscribe((data: any) => {
      // do something, if upload success
      this.image = data.data[0];
      this.imageUpload = this.uploadService.afterUpload(this.imageUpload, data);
    }, error => {
      console.log(error);
    });
  }
}
