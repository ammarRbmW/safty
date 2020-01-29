import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdsRoutingModule } from './ads-routing.module';
import { AdComponent } from './ad/ad.component';
import { AdListComponent } from './ad-list/ad-list.component';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule,
  MatSlideToggleModule,
  MatTableModule, MatTabsModule
} from '@angular/material';
import {SharedModule} from '../../shared/shared.module';
import {FlexModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [AdComponent, AdListComponent],
  imports: [
    CommonModule,
    AdsRoutingModule,
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
    MatSelectModule
  ]
})
export class AdsModule { }
