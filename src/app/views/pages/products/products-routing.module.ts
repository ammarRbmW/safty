import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductComponent} from './product/product.component';

const routes: Routes = [
  {
    path: 'categories/:parentCategoryId',
    component: ProductListComponent,
  }, {
    path: 'create/:parentCategoryId',
    component: ProductComponent,
  }, {
    path: 'edit/:parentCategoryId/:productId',
    component: ProductComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {
}
