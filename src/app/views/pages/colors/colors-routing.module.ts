import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ColorListComponent} from '../colors/color-list/color-list.component';
import {ColorComponent} from '../colors/color/color.component';

const routes: Routes = [
  {
    path: '',
    component: ColorListComponent,
  }, {
    path: 'create',
    component: ColorComponent,
  }, {
    path: 'edit/:colorId',
    component: ColorComponent,
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColorsRoutingModule {
}
