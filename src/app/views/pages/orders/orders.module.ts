import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrderComponent } from './order/order.component';
import { OrderListComponent } from './order-list/order-list.component';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule, MatMenuModule,
  MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule,
  MatSlideToggleModule,
  MatTableModule, MatTabsModule, MatTooltipModule
} from '@angular/material';
import {SharedModule} from '../../shared/shared.module';
import {FlexModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {MdePopoverModule} from '@material-extended/mde';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [OrderComponent, OrderListComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
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
    NgxDatatableModule,
    FormsModule,
    MatMenuModule
  ]
})
export class OrdersModule { }
