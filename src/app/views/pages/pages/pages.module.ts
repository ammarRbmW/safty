import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PagesRoutingModule} from './pages-routing.module';
import {PageComponent} from './page/page.component';
import {PageListComponent} from './page-list/page-list.component';
import {
  MAT_DATE_LOCALE,
  MatButtonModule,
  MatCardModule, MatDatepickerModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule, MatNativeDateModule,
  MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule,
  MatSlideToggleModule,
  MatTableModule, MatTabsModule, MatTooltipModule
} from '@angular/material';
import {SharedModule} from '../../shared/shared.module';
import {FlexModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {MdePopoverModule} from '@material-extended/mde';
import {ArticleListComponent} from './article-list/article-list.component';
import {ArticleComponent} from './article/article.component';
import {QuillModule} from 'ngx-quill';

@NgModule({
  declarations: [PageComponent, PageListComponent, ArticleListComponent, ArticleComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
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
    QuillModule,
    MatDatepickerModule,
    MatNativeDateModule
  ], providers: [
    MatDatepickerModule,
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
  ],
})
export class PagesModule {
}
