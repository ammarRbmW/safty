import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material';
import {handlingError} from '../../../../core/_helpers/handling-error.service';
import {ControlPageService} from '../../../../core/_helpers/control-page.service';
import {Ad, AdAdapter, AdDataAdapter} from '../../../../core/_models/ad';
import {AdApi} from '../../../../core/_api/ad.api';
import {UploadFileService} from '../../../../core/_api';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
})
export class AdComponent implements OnInit {
  routeName = 'ads';
  public form: FormGroup;
  apiUrl = environment.apiUrl;
  uploadImageUrl = this.apiUrl + '/upload/ads';

  id: any;
  image: any;
  isItemEdit = false;
  isLoading = false;
  ad: Ad;

  positionSelect = new FormControl();
  positions = [
    {value: 'b', text: 'bottom'},
    {value: 't', text: 'top'},
    {value: 'l', text: 'left'},
    {value: 'r', text: 'right'}
  ];
  @ViewChild('openDialogImage', {static: false}) openDialogImage: TemplateRef<any>;
  fileImage: File;
  fixedWidth = '700';
  fixedHeight = '250';
  public imageUpload: any = {
    oldImage: '',
    upload_image_disable: true,
    showSpinnerImage: false,
    configImage: {
      ImageName: 'Ad Image',
      AspectRatios: [this.fixedWidth + ':' + this.fixedHeight],
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
    private adApi: AdApi,
    private adAdapter: AdAdapter,
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.setBreadcrumbs();
    this.form = this.fb.group({
      titleEn: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])],
      titleAr: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],
      subTitleEn: [null, Validators.compose([Validators.minLength(2), Validators.maxLength(50)])],
      subTitleAr: [null, Validators.compose([Validators.minLength(2), Validators.maxLength(50)])],
      price: [null, Validators.compose([Validators.maxLength(50)])],
      discount: [null, Validators.compose([Validators.maxLength(50)])],
      position: [null, Validators.compose([])],
      url: [null, Validators.compose([Validators.required])],
      active: [true],
    });

    this.route.params.subscribe(params => {
      if (this.router.url.includes('/create')) {
      } else {
        this.id = params.adId;
        this.isItemEdit = true;
        this.get();
      }
    });

  }

  get() {

    this.adApi.getById(this.id).subscribe((data: any) => {
        this.ad = this.adAdapter.adapt(data.data);
        this.form.controls.titleEn.setValue(this.ad.titleEn);
        this.form.controls.titleAr.setValue(this.ad.titleAr);
        this.form.controls.subTitleEn.setValue(this.ad.subTitleEn);
        this.form.controls.subTitleAr.setValue(this.ad.subTitleAr);
        this.form.controls.price.setValue(this.ad.price);
        this.form.controls.discount.setValue(this.ad.discount);
        this.form.controls.url.setValue(this.ad.url);
        this.form.controls.position.setValue(this.ad.position);
        this.id = this.ad.id;
        this.imageUpload.oldImage = this.apiUrl + this.ad.image;

      },
      (error: any) => {
        handlingError(error, this.toastr, this.router);
      },
      () => {
        this.setBreadcrumbs();
      });
  }

  store() {

    const ad = {
      titleEn: this.form.controls.titleEn.value,
      titleAr: this.form.controls.titleAr.value,
      subTitleEn: this.form.controls.subTitleEn.value,
      subTitleAr: this.form.controls.subTitleAr.value,
      price: this.form.controls.price.value,
      discount: this.form.controls.discount.value,
      url: this.form.controls.url.value,
      position: this.form.controls.position.value,
      image: this.image,
    };

    this.isLoading = true;
    if (this.isItemEdit) {
      this.update(ad);
    } else {
      this.create(ad);
    }
    this.isLoading = false;
  }

  create(ad) {
    this.adApi.create(ad).subscribe((data: any) => {
        this.form.reset();
        this.toastr.success('Item updated successfully.', 'Success');
        this.router.navigate([`/` + this.routeName]);
      },
      (error: any) => {
        handlingError(error, this.toastr, this.router);
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      });
  }

  update(ad) {

    ad.id = this.id;
    this.adApi.update(ad).subscribe((data: any) => {
        this.form.reset();
        this.toastr.success('Item updated successfully', 'success!');
        this.router.navigate([`/` + this.routeName]);
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
