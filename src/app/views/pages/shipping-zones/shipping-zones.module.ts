import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ShippingZonesRoutingModule} from './shipping-zones-routing.module';

import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule,
  MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule,
  MatSlideToggleModule,
  MatTableModule, MatTabsModule, MatTooltipModule
} from '@angular/material';
import {SharedModule} from '../../shared/shared.module';
import {FlexModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {MdePopoverModule} from '@material-extended/mde';
import {ShippingZoneComponent} from './shipping-zone/shipping-zone.component';
import {ShippingZoneListComponent} from './shipping-zone-list/shipping-zone-list.component';
import {CountryComponent} from './country/country.component';
import {CountryListComponent} from './country-list/country-list.component';

@NgModule({
  declarations: [ShippingZoneComponent, ShippingZoneListComponent, CountryComponent, CountryListComponent],
  imports: [
    CommonModule,
    ShippingZonesRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule,
    FlexModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    TranslateModule,
    MatIconModule,
    MatTooltipModule,
    MdePopoverModule,
    MatSelectModule
  ]
})
export class ShippingZonesModule {
}
