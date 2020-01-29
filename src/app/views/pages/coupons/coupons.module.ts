import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CouponsRoutingModule} from './coupons-routing.module';
import {CouponComponent} from './coupon/coupon.component';
import {CouponListComponent} from './coupon-list/coupon-list.component';
import {
  MAT_DATE_FORMATS, MAT_DATE_LOCALE,
  MatButtonModule,
  MatCardModule, MatDatepickerModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule, MatNativeDateModule,
  MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule,
  MatSlideToggleModule,
  MatTableModule, MatTabsModule, MatTooltipModule
} from '@angular/material';
import {SharedModule} from '../../shared/shared.module';
import {FlexModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {MdePopoverModule} from '@material-extended/mde';
import {DateAdapter} from 'angular-calendar';
import {APP_DATE_FORMATS, AppDateAdapter} from '../../../core/_services/format-datepicker';

@NgModule({
  declarations: [CouponComponent, CouponListComponent],
  imports: [
    CommonModule,
    CouponsRoutingModule,
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
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ], providers: [
    MatDatepickerModule,
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
  ],
})
export class CouponsModule {
}
