import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  MatAutocompleteModule,
  MatButtonModule, MatButtonToggleModule, MatIconModule, MatInputModule, MatMenuModule, MatProgressSpinnerModule,
  MatSliderModule, MatDialogModule,
  MatTabsModule, MatTooltipModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

export * from './image-editor.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatSliderModule,
    MatAutocompleteModule
  ],
  declarations: [
    // ImageEditorComponent
  ],
  exports: [
    // ImageEditorComponent
  ]
  , entryComponents: [
    // ImageEditorComponent,
  ],
})
export class ImageEditorModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ImageEditorModule,
    };
  }
}
