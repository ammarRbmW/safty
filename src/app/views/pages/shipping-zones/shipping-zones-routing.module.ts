import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShippingZoneListComponent} from './shipping-zone-list/shipping-zone-list.component';
import {ShippingZoneComponent} from './shipping-zone/shipping-zone.component';
import {CountryListComponent} from './country-list/country-list.component';
import {CountryComponent} from './country/country.component';

const routes: Routes = [
  {
    path: '',
    component: ShippingZoneListComponent,
  }, {
    path: 'create',
    component: ShippingZoneComponent,
  }, {
    path: 'edit/:shippingZoneId',
    component: ShippingZoneComponent,
  }, {
    path: 'countries/:shippingZoneId',
    component: CountryListComponent,
  }, {
    path: 'countries/create/:shippingZoneId',
    component: CountryComponent,
  }, {
    path: 'countries/edit/:shippingZoneId/:countryId',
    component: CountryComponent,
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShippingZonesRoutingModule {
}
