import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {ChartistModule} from 'ng-chartist';
import {RouterModule} from '@angular/router';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule, MatSlideToggleModule,
  MatTableModule,
  MatTabsModule
} from '@angular/material';
import {SharedModule} from '../../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FlexLayoutModule,
    ChartistModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,

    MatTableModule,
    MatPaginatorModule,
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
export class HomeModule {
}
