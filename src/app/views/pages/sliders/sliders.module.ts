import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SlidersRoutingModule } from './sliders-routing.module';
import { SliderComponent } from './slider/slider.component';
import { SliderListComponent } from './slider-list/slider-list.component';
import {
  MatButtonModule,
  MatCardModule,
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
  declarations: [SliderComponent, SliderListComponent],
  imports: [
    CommonModule,
    SlidersRoutingModule,
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
    MatSelectModule
  ]
})
export class SlidersModule { }
