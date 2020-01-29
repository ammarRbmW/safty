import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material';
import {handlingError} from '../../../../core/_helpers/handling-error.service';
import {ControlPageService} from '../../../../core/_helpers/control-page.service';
import {Brand, BrandAdapter} from '../../../../core/_models/brand';
import {BrandApi} from '../../../../core/_api/brand.api';
import {UploadFileService} from '../../../../core/_api';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
})
export class BrandComponent implements OnInit {
  routeName = 'brands';
  public form: FormGroup;
  apiUrl = environment.apiUrl;
  uploadImageUrl = this.apiUrl + '/upload/brands';

  id: any;
  image: any;
  isItemEdit = false;
  isLoading = false;
  brand: Brand;

  @ViewChild('openDialogImage', {static: false}) openDialogImage: TemplateRef<any>;
  fileImage: File;
  fixedWidth = '400';
  fixedHeight = '200';
  public imageUpload: any = {
    oldImage: '',
    upload_image_disable: true,
    showSpinnerImage: false,
    configImage: {
      ImageName: 'Brand Image',
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
    private brandApi: BrandApi,
    private brandAdapter: BrandAdapter,
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.setBreadcrumbs();
    this.form = this.fb.group({
      nameEn: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])],
      nameAr: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],
      code: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],
      active: [true],
    });

    this.route.params.subscribe(params => {
      if (this.router.url.includes('/create')) {
      } else {
        this.id = params.brandId;
        this.isItemEdit = true;
        this.get();
      }
    });

  }

  get() {

    this.brandApi.getById(this.id).subscribe((data: any) => {
        this.brand = this.brandAdapter.adapt(data.data);
        this.form.controls.nameEn.setValue(this.brand.nameEn);
        this.form.controls.nameAr.setValue(this.brand.nameAr);
        this.form.controls.code.setValue(this.brand.code);
        this.id = this.brand.id;
        this.imageUpload.oldImage = this.apiUrl + this.brand.image;

      },
      (error: any) => {
        handlingError(error, this.toastr, this.router);
      },
      () => {
        this.setBreadcrumbs();
      });
  }

  store() {

    const brand = {
      nameEn: this.form.controls.nameEn.value,
      nameAr: this.form.controls.nameAr.value,
      code: this.form.controls.code.value,
      image: this.image,

    };

    this.isLoading = true;
    if (this.isItemEdit) {
      this.update(brand);
    } else {
      this.create(brand);
    }
    this.isLoading = false;
  }

  create(brand) {
    this.brandApi.create(brand).subscribe((data: any) => {
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

  update(brand) {

    brand.id = this.id;
    this.brandApi.update(brand).subscribe((data: any) => {
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
