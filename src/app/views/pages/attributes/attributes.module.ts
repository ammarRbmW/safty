import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AttributesRoutingModule} from './attributes-routing.module';
import {AttributeComponent} from './attribute/attribute.component';
import {AttributeListComponent} from './attribute-list/attribute-list.component';
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
  declarations: [AttributeComponent, AttributeListComponent],
  imports: [
    CommonModule,
    AttributesRoutingModule,
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
export class AttributesModule {
}
