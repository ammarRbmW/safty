import {NgModule} from '@angular/core';

import {MenuItems} from './menu-items/menu-items';
import {
  AccordionAnchorDirective,
  AccordionLinkDirective,
  AccordionDirective
} from './accordion';
import {DialogComponent} from './dialog/dialog.component';
import {
  MatButtonModule, MatButtonToggleModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule, MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule, MatSliderModule, MatTableModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {CrudCardComponent} from './crud-card/crud-card.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FlexModule} from '@angular/flex-layout';
import {InputValidationComponent} from './form/input-validation/input-validation.component';
import {ValidationMessageComponent} from './form/validation-message/validation-message.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EditorComponent} from './editor/editor.component';
import {QuillModule} from 'ngx-quill';
import {UploadCardComponent} from './upload-card/upload-card.component';
import {ImageEditorComponent} from './image-editor/image-editor.component';
import {TableComponent} from './table/table.component';
import {CrudListComponent} from './crud-list/crud-list.component';
import {TranslateModule} from '@ngx-translate/core';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';


@NgModule({
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    DialogComponent,
    CrudCardComponent,
    CrudListComponent,
    InputValidationComponent,
    ValidationMessageComponent,
    EditorComponent,
    UploadCardComponent,
    ImageEditorComponent,
    TableComponent,
    BreadcrumbComponent
  ],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    DialogComponent,
    CrudCardComponent,
    CrudListComponent,
    InputValidationComponent,
    ValidationMessageComponent,
    EditorComponent,
    UploadCardComponent,
    ImageEditorComponent,
    TableComponent,
    BreadcrumbComponent
  ],
  entryComponents: [
    DialogComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
    FlexModule,
    MatTooltipModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    QuillModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatSliderModule,
    FormsModule,
    MatPaginatorModule,
    MatTableModule,
    TranslateModule
  ],
  providers: [MenuItems]
})
export class SharedModule {
}
