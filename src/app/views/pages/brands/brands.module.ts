import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandsRoutingModule } from './brands-routing.module';
import { BrandListComponent } from './brand-list/brand-list.component';
import { BrandComponent } from './brand/brand.component';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule, MatProgressSpinnerModule,
  MatSlideToggleModule,
  MatTableModule, MatTabsModule
} from '@angular/material';
import {SharedModule} from '../../shared/shared.module';
import {FlexModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  declarations: [BrandListComponent, BrandComponent],
  imports: [
    CommonModule,
    BrandsRoutingModule,
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
    TranslateModule
  ]
})
export class BrandsModule { }
