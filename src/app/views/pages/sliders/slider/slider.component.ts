import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material';
import {handlingError} from '../../../../core/_helpers/handling-error.service';
import {ControlPageService} from '../../../../core/_helpers/control-page.service';
import {Slider, SliderAdapter, SliderDataAdapter} from '../../../../core/_models/slider';
import {SliderApi} from '../../../../core/_api/slider.api';
import {UploadFileService} from '../../../../core/_api';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
})
export class SliderComponent implements OnInit {
  routeName = 'sliders';
  public form: FormGroup;
  apiUrl = environment.apiUrl;
  uploadImageUrl = this.apiUrl + '/upload/sliders';

  id: any;
  image: any;
  isItemEdit = false;
  isLoading = false;
  slider: Slider;

  @ViewChild('openDialogImage', {static: false}) openDialogImage: TemplateRef<any>;
  fileImage: File;
  fixedWidth = '850';
  fixedHeight = '460';
  public imageUpload: any = {
    oldImage: '',
    upload_image_disable: true,
    showSpinnerImage: false,
    configImage: {
      ImageName: 'Slider Image',
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
    private sliderApi: SliderApi,
    private sliderAdapter: SliderAdapter,
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.setBreadcrumbs();
    this.form = this.fb.group({
      url: [null, Validators.compose([Validators.minLength(2), Validators.maxLength(1000)])],
    });

    this.route.params.subscribe(params => {
      if (this.router.url.includes('/create')) {
      } else {
        this.id = params.sliderId;
        this.isItemEdit = true;
        this.get();
      }
    });

  }

  get() {

    this.sliderApi.getById(this.id).subscribe((data: any) => {
        this.slider = this.sliderAdapter.adapt(data.data);
        this.form.controls.url.setValue(this.slider.url);
        this.id = this.slider.id;
        this.imageUpload.oldImage = this.apiUrl + this.slider.image;

      },
      (error: any) => {
        handlingError(error, this.toastr, this.router);
      },
      () => {
        this.setBreadcrumbs();
      });
  }

  store() {

    const slider = {
      url: this.form.controls.url.value,
      image: this.image,
    };

    this.isLoading = true;
    if (this.isItemEdit) {
      this.update(slider);
    } else {
      this.create(slider);
    }
    this.isLoading = false;
  }

  create(slider) {
    this.sliderApi.create(slider).subscribe((data: any) => {
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

  update(slider) {

    slider.id = this.id;
    this.sliderApi.update(slider).subscribe((data: any) => {
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
