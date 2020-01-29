import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CouponListComponent} from './coupon-list/coupon-list.component';
import {CouponComponent} from './coupon/coupon.component';

const routes: Routes = [
  {
    path: '',
    component: CouponListComponent,
  }, {
    path: 'create',
    component: CouponComponent,
  }, {
    path: 'edit/:couponId',
    component: CouponComponent,
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouponsRoutingModule {
}
