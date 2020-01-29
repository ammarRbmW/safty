import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {Country, CountryAdapter} from '../../../../core/_models/country';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ControlPageService} from '../../../../core/_helpers/control-page.service';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material';
import {CountryApi} from '../../../../core/_api/country.api';
import {DialogComponent} from '../../../shared/dialog/dialog.component';
import {handlingError} from '../../../../core/_helpers/handling-error.service';
import {ListAnimation} from '../../../shared/animations/list';
import {ShippingZoneApi} from '../../../../core/_api/shipping-zone.api';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  animations: ListAnimation
})
export class CountryListComponent implements OnInit {
  apiUrl = environment.apiUrl;
  url: string = this.apiUrl + '/countries';
  countries: Country[] = [];
  routeName = 'countries';
  shippingZoneId: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public controlPageService: ControlPageService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    public shippingZoneApi: ShippingZoneApi,
    public countryApi: CountryApi,
    public countryAdapter: CountryAdapter,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(params => {
      this.shippingZoneId = params.shippingZoneId;
      this.shippingZoneApi.getById(this.shippingZoneId).subscribe(
        (data: any) => {
          this.countriesAdapter(data.data.countries);
          this.controlPageService.setCreateLink('/shipping-zones/countries/create/' + this.shippingZoneId);
        }
      );
    });
  }

  countriesAdapter(countries) {
    this.countries = [];
    countries.forEach(country => {
      this.countries.push(this.countryAdapter.adapt(country));
    });
  }

  ngOnInit(): void {
    this.setBreadcrumbs();
  }

  delete(itemId, index) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.countryApi.delete(itemId).subscribe((data: any) => {
            const temp = [...this.countries];
            temp.splice(index, 1);
            this.countries = temp;
            this.toastr.success('Item deleted successfully.', 'Success');
          },
          (error: any) => {
            handlingError(error, this.toastr, this.router);
          },
          () => {
          });
      }
    });
  }

  setBreadcrumbs() {
    const breadcrumbArray = [];
    breadcrumbArray[0] = {label: 'Home', url: '/home', params: []};
    breadcrumbArray[1] = {label: this.routeName, url: '/' + this.routeName, params: []};

    this.controlPageService.setBreadcrumb(breadcrumbArray);
  }

}

