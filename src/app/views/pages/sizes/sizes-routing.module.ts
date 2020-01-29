import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SizeListComponent} from '../sizes/size-list/size-list.component';
import {SizeComponent} from '../sizes/size/size.component';

const routes: Routes = [
  {
    path: '',
    component: SizeListComponent,
  }, {
    path: 'create',
    component: SizeComponent,
  }, {
    path: 'edit/:sizeId',
    component: SizeComponent,
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SizesRoutingModule {
}
