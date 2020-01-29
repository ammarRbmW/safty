import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProductComponent} from '../products/product/product.component';
import {AttributeComponent} from './attribute/attribute.component';
import {AttributeListComponent} from './attribute-list/attribute-list.component';


const routes: Routes = [
  {
    path: '',
    component: AttributeListComponent,
  }, {
    path: 'create',
    component: AttributeComponent,
  }, {
    path: 'edit/:attributeId',
    component: AttributeComponent,
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttributesRoutingModule {
}
