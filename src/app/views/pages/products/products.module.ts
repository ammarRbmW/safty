import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductsRoutingModule} from './products-routing.module';
import {ProductComponent} from './product/product.component';
import {ProductListComponent} from './product-list/product-list.component';
import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule, MatListModule,
  MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule,
  MatSlideToggleModule, MatStepperModule,
  MatTableModule, MatTabsModule
} from '@angular/material';
import {SharedModule} from '../../shared/shared.module';
import {FlexModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {ProductItemComponent} from './product-item/product-item.component';
import {ProductItemListComponent} from './product-item-list/product-item-list.component';
import { ProductImagesComponent } from './product-images/product-images.component';
import {QuillModule} from 'ngx-quill';
import { RelatedProductComponent } from './related-product/related-product.component';


@NgModule({
  declarations: [ProductComponent, ProductListComponent, ProductItemComponent, ProductItemListComponent, ProductImagesComponent, RelatedProductComponent],

  imports: [
    CommonModule,
    ProductsRoutingModule,
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
    MatSelectModule,
    MatStepperModule,
    MatListModule,
    QuillModule,
    MatCheckboxModule,
    MatIconModule
  ], exports: [
    ProductItemComponent
  ], entryComponents: [
    ProductItemComponent
  ]
})
export class ProductsModule {
}
