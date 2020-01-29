import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDatepickerModule, MatDialog} from '@angular/material';
import {handlingError} from '../../../../core/_helpers/handling-error.service';
import {ControlPageService} from '../../../../core/_helpers/control-page.service';
import {Coupon, CouponAdapter, CouponDataAdapter} from '../../../../core/_models/coupon';
import {CouponApi} from '../../../../core/_api/coupon.api';
import {environment} from '../../../../../environments/environment';
import * as _moment from 'moment';

const moment = _moment;

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
})
export class CouponComponent implements OnInit {
  routeName = 'coupons';
  public form: FormGroup;
  apiUrl = environment.apiUrl;

  id: any;
  image: any;
  isItemEdit = false;
  isLoading = false;
  coupon: Coupon;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private controlPageService: ControlPageService,
    private toastr: ToastrService,
    private couponApi: CouponApi,
    private couponAdapter: CouponAdapter,
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.setBreadcrumbs();
    this.form = this.fb.group({
      code: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],
      discountType: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
      value: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])],
      startDate: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])],
      endDate: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])],
      active: [true],
    });

    this.route.params.subscribe(params => {
      if (this.router.url.includes('/create')) {
      } else {
        this.id = params.couponId;
        this.isItemEdit = true;
        this.get();
      }
    });

  }

  dataFormat(date) {

    let day: string = date.getDate().toString();
    day = +day < 10 ? '0' + day : day;
    let month: string = (date.getMonth() + 1).toString();
    month = +month < 10 ? '0' + month : month;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  get() {

    this.couponApi.getById(this.id).subscribe((data: any) => {
        this.coupon = this.couponAdapter.adapt(data.data);
        this.form.controls.code.setValue(this.coupon.code);
        this.form.controls.discountType.setValue(this.coupon.discountType);
        this.form.controls.value.setValue(this.coupon.value);
        this.form.controls.startDate.setValue(this.coupon.startDate);
        this.form.controls.endDate.setValue(this.coupon.endDate);
        this.id = this.coupon.id;

      },
      (error: any) => {
        handlingError(error, this.toastr, this.router);
      },
      () => {
        this.setBreadcrumbs();
      });
  }

  store() {
    const startDate = moment(this.form.controls.startDate.value).format('DD-MM-YYYY');
    const endDate = moment(this.form.controls.endDate.value).format('DD-MM-YYYY');

    const coupon = {
      code: this.form.controls.code.value,
      discountType: this.form.controls.discountType.value,
      value: this.form.controls.value.value,
      startDate: startDate,
      endDate: endDate,
    };

    this.isLoading = true;
    if (this.isItemEdit) {
      this.update(coupon);
    } else {
      this.create(coupon);
    }
    this.isLoading = false;
  }

  create(coupon) {
    this.couponApi.create(coupon).subscribe((data: any) => {
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

  update(coupon) {

    coupon.id = this.id;
    this.couponApi.update(coupon).subscribe((data: any) => {
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
