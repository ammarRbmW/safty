import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material';
import {handlingError} from '../../../../core/_helpers/handling-error.service';
import {ControlPageService} from '../../../../core/_helpers/control-page.service';
import {Size, SizeAdapter} from '../../../../core/_models/size';
import {SizeApi} from '../../../../core/_api/size.api';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
})
export class SizeComponent implements OnInit {
  routeName = 'sizes';
  public form: FormGroup;
  apiUrl = environment.apiUrl;

  id: any;
  isItemEdit = false;
  isLoading = false;
  size: Size;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private controlPageService: ControlPageService,
    private toastr: ToastrService,
    private sizeApi: SizeApi,
    private sizeAdapter: SizeAdapter,
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
        this.id = params.sizeId;
        this.isItemEdit = true;
        this.get();
      }
    });

  }

  get() {

    this.sizeApi.getById(this.id).subscribe((data: any) => {
        this.size = this.sizeAdapter.adapt(data.data);
        this.form.controls.nameEn.setValue(this.size.nameEn);
        this.form.controls.nameAr.setValue(this.size.nameAr);
        this.form.controls.code.setValue(this.size.code);
        this.id = this.size.id;

      },
      (error: any) => {
        handlingError(error, this.toastr, this.router);
      },
      () => {
        this.setBreadcrumbs();
      });
  }

  store() {

    const size = {
      nameEn: this.form.controls.nameEn.value,
      nameAr: this.form.controls.nameAr.value,
      code: this.form.controls.code.value,
    };

    this.isLoading = true;
    if (this.isItemEdit) {
      this.update(size);
    } else {
      this.create(size);
    }
    this.isLoading = false;
  }

  create(size) {
    this.sizeApi.create(size).subscribe((data: any) => {
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

  update(size) {

    size.id = this.id;
    this.sizeApi.update(size).subscribe((data: any) => {
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
