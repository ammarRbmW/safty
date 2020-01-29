import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CategoryComponent} from './category/category.component';
import {CategoryListComponent} from './category-list/category-list.component';


const routes: Routes = [
  {
    path: '',
    component: CategoryListComponent,
  }, {
    path: ':parentCategoryId',
    component: CategoryListComponent,
  }, {
    path: 'create',
    component: CategoryComponent,
  }, {
    path: 'create/:parentCategoryId',
    component: CategoryComponent,
  }, {
    path: 'edit/:categoryId',
    component: CategoryComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule {
}
