import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SliderListComponent} from './slider-list/slider-list.component';
import {SliderComponent} from './slider/slider.component';

const routes: Routes = [
  {
    path: '',
    component: SliderListComponent,
  }, {
    path: 'create',
    component: SliderComponent,
  }, {
    path: 'edit/:sliderId',
    component: SliderComponent,
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SlidersRoutingModule {
}
