import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CategoriesRoutingModule} from './categories-routing.module';
import {CategoryComponent} from './category/category.component';
import {CategoryListComponent} from './category-list/category-list.component';
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
  declarations: [CategoryComponent, CategoryListComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
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
export class CategoriesModule {
}
