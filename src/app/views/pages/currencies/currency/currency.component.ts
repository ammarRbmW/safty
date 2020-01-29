import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material';
import {handlingError} from '../../../../core/_helpers/handling-error.service';
import {ControlPageService} from '../../../../core/_helpers/control-page.service';
import {Currency, CurrencyAdapter} from '../../../../core/_models/currency';
import {CurrencyApi} from '../../../../core/_api/currency.api';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
})
export class CurrencyComponent implements OnInit {
  routeName = 'currencies';
  public form: FormGroup;
  apiUrl = environment.apiUrl;

  id: any;
  image: any;
  isItemEdit = false;
  isLoading = false;
  currency: Currency;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private controlPageService: ControlPageService,
    private toastr: ToastrService,
    private currencyApi: CurrencyApi,
    private currencyAdapter: CurrencyAdapter,
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.setBreadcrumbs();
    this.form = this.fb.group({
      nameEn: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])],
      nameAr: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],
      symbolEn: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
      symbolAr: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
      exchangeRate: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
      code: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],
      active: [true],
      isBaseCurrency: [false],
    });

    this.route.params.subscribe(params => {
      if (this.router.url.includes('/create')) {
      } else {
        this.id = params.currencyId;
        this.isItemEdit = true;
        this.get();
      }
    });

  }

  get() {

    this.currencyApi.getById(this.id).subscribe((data: any) => {
        this.currency = this.currencyAdapter.adapt(data.data);
        this.form.controls.nameEn.setValue(this.currency.nameEn);
        this.form.controls.nameAr.setValue(this.currency.nameAr);
        this.form.controls.symbolEn.setValue(this.currency.symbolEn);
        this.form.controls.symbolAr.setValue(this.currency.symbolAr);
        this.form.controls.code.setValue(this.currency.code);
        this.form.controls.exchangeRate.setValue(this.currency.exchangeRate);
        this.form.controls.isBaseCurrency.setValue(this.currency.isBaseCurrency);
        this.id = this.currency.id;
      },
      (error: any) => {
        handlingError(error, this.toastr, this.router);
      },
      () => {
        this.setBreadcrumbs();
      });
  }

  store() {

    const currency = {
      nameEn: this.form.controls.nameEn.value,
      nameAr: this.form.controls.nameAr.value,
      symbolEn: this.form.controls.symbolEn.value,
      symbolAr: this.form.controls.symbolAr.value,
      code: this.form.controls.code.value,
      isBaseCurrency: this.form.controls.isBaseCurrency.value,
      exchangeRate: this.form.controls.exchangeRate.value,
    };

    this.isLoading = true;
    if (this.isItemEdit) {
      this.update(currency);
    } else {
      this.create(currency);
    }
    this.isLoading = false;
  }

  create(currency) {
    this.currencyApi.create(currency).subscribe((data: any) => {
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

  update(currency) {

    currency.id = this.id;
    this.currencyApi.update(currency).subscribe((data: any) => {
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
