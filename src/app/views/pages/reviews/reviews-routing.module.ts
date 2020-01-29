import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ReviewListComponent} from './review-list/review-list.component';
import {ReviewComponent} from './review/review.component';


const routes: Routes = [
  {
    path: '',
    component: ReviewListComponent,
  }, {
    path: 'create',
    component: ReviewComponent,
  }, {
    path: 'edit/:reviewId',
    component: ReviewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewsRoutingModule {
}
