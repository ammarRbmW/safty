import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserListComponent} from './user-list/user-list.component';
import {UserComponent} from './user/user.component';


const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
  }, {
    path: 'type/:userType',
    component: UserListComponent,
  }, {
    path: 'create',
    component: UserComponent,
  }, {
    path: 'profile/:userId',
    component: UserComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
