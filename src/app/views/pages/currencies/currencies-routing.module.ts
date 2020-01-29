import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CurrencyListComponent} from './currency-list/currency-list.component';
import {CurrencyComponent} from './currency/currency.component';

const routes: Routes = [
  {
    path: '',
    component: CurrencyListComponent,
  }, {
    path: 'create',
    component: CurrencyComponent,
  }, {
    path: 'edit/:currencyId',
    component: CurrencyComponent,
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrenciesRoutingModule {
}
