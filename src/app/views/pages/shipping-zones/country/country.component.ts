import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material';
import {handlingError} from '../../../../core/_helpers/handling-error.service';
import {ControlPageService} from '../../../../core/_helpers/control-page.service';
import {Country, CountryAdapter, CountryDataAdapter} from '../../../../core/_models/country';
import {CountryApi} from '../../../../core/_api/country.api';
import {environment} from '../../../../../environments/environment';
import {ShippingZoneApi} from '../../../../core/_api/shipping-zone.api';
import {ShippingZone, ShippingZoneAdapter} from '../../../../core/_models/shipping-zone';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
})
export class CountryComponent implements OnInit {
  routeName = 'countries';
  public form: FormGroup;
  apiUrl = environment.apiUrl;

  id: any;
  isItemEdit = false;
  isLoading = false;
  country: Country;
  shippingZones: ShippingZone[];
  shippingZoneId: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private controlPageService: ControlPageService,
    private toastr: ToastrService,
    private shippingZoneApi: ShippingZoneApi,
    private shippingZoneAdapter: ShippingZoneAdapter,
    private countryApi: CountryApi,
    private countryAdapter: CountryAdapter,
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.setBreadcrumbs();
    this.form = this.fb.group({
      nameEn: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])],
      nameAr: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],
      iso2: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],
      iso3: [null, Validators.compose([Validators.minLength(2), Validators.maxLength(50)])],
      active: [true],
    });

    this.route.params.subscribe(params => {
      this.shippingZoneId = params.shippingZoneId;

      if (this.router.url.includes('/create')) {
      } else {
        this.id = params.countryId;
        this.isItemEdit = true;
        this.get();
      }
    });

  }

  getAllShippingZones() {
    this.shippingZoneApi.list().subscribe((data: any) => {
        this.shippingZones = data;
      },
      (error: any) => {
        handlingError(error, this.toastr, this.router);
      },
      () => {
        this.setBreadcrumbs();
      });
  }

  get() {

    this.countryApi.getById(this.id).subscribe((data: any) => {
        this.country = this.countryAdapter.adapt(data.data);
        this.form.controls.nameEn.setValue(this.country.nameEn);
        this.form.controls.nameAr.setValue(this.country.nameAr);
        this.form.controls.iso2.setValue(this.country.iso2);
        this.form.controls.iso3.setValue(this.country.iso3);
        this.id = this.country.id;
      },
      (error: any) => {
        handlingError(error, this.toastr, this.router);
      },
      () => {
        this.setBreadcrumbs();
      });
  }

  store() {

    const country = {
      nameEn: this.form.controls.nameEn.value,
      nameAr: this.form.controls.nameAr.value,
      iso2: this.form.controls.iso2.value,
      iso3: this.form.controls.iso3.value,
      shipping_zones_id: this.shippingZoneId,
    };

    this.isLoading = true;
    if (this.isItemEdit) {
      this.update(country);
    } else {
      this.create(country);
    }
    this.isLoading = false;
  }

  create(country) {
    this.countryApi.create(country).subscribe((data: any) => {
        this.form.reset();
        this.toastr.success('Item updated successfully.', 'Success');
        this.router.navigate([`/shipping-zones/countries/` + this.shippingZoneId]);
      },
      (error: any) => {
        handlingError(error, this.toastr, this.router);
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      });
  }

  update(country) {

    country.id = this.id;
    this.countryApi.update(country).subscribe((data: any) => {
        this.form.reset();
        this.toastr.success('Item updated successfully', 'success!');
        this.router.navigate([`/shipping-zones/countries/` + this.shippingZoneId]);
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
