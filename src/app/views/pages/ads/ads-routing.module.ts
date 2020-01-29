import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdListComponent} from './ad-list/ad-list.component';
import {AdComponent} from './ad/ad.component';

const routes: Routes = [
  {
    path: '',
    component: AdListComponent,
  }, {
    path: 'create',
    component: AdComponent,
  }, {
    path: 'edit/:adId',
    component: AdComponent,
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdsRoutingModule {
}
