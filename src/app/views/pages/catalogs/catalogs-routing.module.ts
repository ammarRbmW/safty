import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CatalogComponent} from './catalog/catalog.component';
import {CatalogListComponent} from './catalog-list/catalog-list.component';
import {CatalogProductListComponent} from './catalog-product-list/catalog-product-list.component';


const routes: Routes = [
  {
    path: '',
    component: CatalogListComponent,
  }, {
    path: 'create',
    component: CatalogComponent,
  }, {
    path: 'edit/:catalogId',
    component: CatalogComponent,
  }, {
    path: ':catalogId/products',
    component: CatalogProductListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogsRoutingModule {
}
