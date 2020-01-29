import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material';
import {handlingError} from '../../../../core/_helpers/handling-error.service';
import {ControlPageService} from '../../../../core/_helpers/control-page.service';
import {ShippingZone, ShippingZoneAdapter, ShippingZoneDataAdapter} from '../../../../core/_models/shipping-zone';
import {ShippingZoneApi} from '../../../../core/_api/shipping-zone.api';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-shipping-zone',
  templateUrl: './shipping-zone.component.html',
})
export class ShippingZoneComponent implements OnInit {
  routeName = 'shipping-zones';
  public form: FormGroup;
  apiUrl = environment.apiUrl;

  id: any;
  image: any;
  isItemEdit = false;
  isLoading = false;
  shippingZone: ShippingZone;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private controlPageService: ControlPageService,
    private toastr: ToastrService,
    private shippingZoneApi: ShippingZoneApi,
    private shippingZoneAdapter: ShippingZoneAdapter,
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
        this.id = params.shippingZoneId;
        this.isItemEdit = true;
        this.get();
      }
    });

  }

  get() {

    this.shippingZoneApi.getById(this.id).subscribe((data: any) => {
        this.shippingZone = this.shippingZoneAdapter.adapt(data.data);
        this.form.controls.nameEn.setValue(this.shippingZone.nameEn);
        this.form.controls.nameAr.setValue(this.shippingZone.nameAr);
        this.form.controls.code.setValue(this.shippingZone.code);
        this.id = this.shippingZone.id;

      },
      (error: any) => {
        handlingError(error, this.toastr, this.router);
      },
      () => {
        this.setBreadcrumbs();
      });
  }

  store() {

    const shippingZone = {
      nameEn: this.form.controls.nameEn.value,
      nameAr: this.form.controls.nameAr.value,
      code: this.form.controls.code.value,
      image: this.image,

    };

    this.isLoading = true;
    if (this.isItemEdit) {
      this.update(shippingZone);
    } else {
      this.create(shippingZone);
    }
    this.isLoading = false;
  }

  create(shippingZone) {
    this.shippingZoneApi.create(shippingZone).subscribe((data: any) => {
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

  update(shippingZone) {

    shippingZone.id = this.id;
    this.shippingZoneApi.update(shippingZone).subscribe((data: any) => {
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
