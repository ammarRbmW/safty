import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BrandListComponent} from './brand-list/brand-list.component';
import {BrandComponent} from './brand/brand.component';


const routes: Routes = [
  {
    path: '',
    component: BrandListComponent,
  }, {
    path: 'create',
    component: BrandComponent,
  }, {
    path: 'edit/:brandId',
    component: BrandComponent,
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandsRoutingModule {
}
