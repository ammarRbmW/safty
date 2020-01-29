import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material';
import {handlingError} from '../../../../core/_helpers/handling-error.service';
import {ControlPageService} from '../../../../core/_helpers/control-page.service';
import {Color, ColorAdapter} from '../../../../core/_models/color';
import {ColorApi} from '../../../../core/_api/color.api';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
})
export class ColorComponent implements OnInit {
  routeName = 'colors';
  public form: FormGroup;
  apiUrl = environment.apiUrl;

  id: any;
  isItemEdit = false;
  isLoading = false;
  color: Color;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private controlPageService: ControlPageService,
    private toastr: ToastrService,
    private colorApi: ColorApi,
    private colorAdapter: ColorAdapter,
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
        this.id = params.colorId;
        this.isItemEdit = true;
        this.get();
      }
    });

  }

  get() {

    this.colorApi.getById(this.id).subscribe((data: any) => {
        this.color = this.colorAdapter.adapt(data.data);
        this.form.controls.nameEn.setValue(this.color.nameEn);
        this.form.controls.nameAr.setValue(this.color.nameAr);
        this.form.controls.code.setValue(this.color.code);
        this.id = this.color.id;

      },
      (error: any) => {
        handlingError(error, this.toastr, this.router);
      },
      () => {
        this.setBreadcrumbs();
      });
  }

  store() {

    const color = {
      nameEn: this.form.controls.nameEn.value,
      nameAr: this.form.controls.nameAr.value,
      code: this.form.controls.code.value,
    };

    this.isLoading = true;
    if (this.isItemEdit) {
      this.update(color);
    } else {
      this.create(color);
    }
    this.isLoading = false;
  }

  create(color) {
    this.colorApi.create(color).subscribe((data: any) => {
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

  update(color) {

    color.id = this.id;
    this.colorApi.update(color).subscribe((data: any) => {
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
}
