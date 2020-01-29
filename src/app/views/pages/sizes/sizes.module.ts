import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SizesRoutingModule } from './sizes-routing.module';
import { SizeListComponent } from './size-list/size-list.component';
import { SizeComponent } from './size/size.component';
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
  declarations: [SizeListComponent, SizeComponent],
  imports: [
    CommonModule,
    SizesRoutingModule,
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
export class SizesModule { }
