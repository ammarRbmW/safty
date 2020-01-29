import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CurrenciesRoutingModule} from './currencies-routing.module';
import {CurrencyComponent} from './currency/currency.component';
import {CurrencyListComponent} from './currency-list/currency-list.component';
import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule,
  MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule,
  MatSlideToggleModule,
  MatTableModule, MatTabsModule, MatTooltipModule
} from '@angular/material';
import {SharedModule} from '../../shared/shared.module';
import {FlexModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {MdePopoverModule} from '@material-extended/mde';

@NgModule({
  declarations: [CurrencyComponent, CurrencyListComponent],
  imports: [
    CommonModule,
    CurrenciesRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule,
    FlexModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    TranslateModule,
    MatIconModule,
    MatTooltipModule,
    MdePopoverModule,
    MatSelectModule,
    MatCheckboxModule
  ]
})
export class CurrenciesModule {
}
