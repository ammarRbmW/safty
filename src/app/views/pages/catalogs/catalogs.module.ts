import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CatalogsRoutingModule} from './catalogs-routing.module';
import {CatalogListComponent} from './catalog-list/catalog-list.component';
import {CatalogComponent} from './catalog/catalog.component';
import {
  MatButtonModule,
  MatCardModule, MatExpansionModule,
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
import { CatalogProductListComponent } from './catalog-product-list/catalog-product-list.component';


@NgModule({
  declarations: [CatalogListComponent, CatalogComponent, CatalogProductListComponent],
  imports: [
    CommonModule,
    CatalogsRoutingModule,
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
    MatExpansionModule
  ]
})
export class CatalogsModule {
}
