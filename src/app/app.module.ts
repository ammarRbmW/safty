import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FullComponent} from './views/layouts/full/full.component';
import {AppHeaderComponent} from './views/layouts/full/header/header.component';
import {SpinnerComponent} from './views/shared/spinner.component';
import {AppBlankComponent} from './views/layouts/blank/blank.component';
import {AppSidebarComponent} from './views/layouts/full/sidebar/sidebar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SharedModule} from './views/shared/shared.module';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpClient} from '@angular/common/http';


import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {ToastrModule} from 'ngx-toastr';
import {SortablejsModule} from 'ngx-sortablejs';
import {BreadcrumbsModule, BreadcrumbsService} from 'ng2-breadcrumbs';
import {PageTitleComponent} from './views/layouts/full/page-title/page-title.component';
import {QuillModule} from 'ngx-quill';
import {
  MatCheckboxModule,
  MatIconModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatSlideToggleModule,
  MatToolbarModule,
  MatSidenavModule, MatMenuModule, MatButtonModule, MatCardModule, MatTooltipModule
} from '@angular/material';
import {ErrorInterceptor} from './core/_helpers/error.interceptor';
import {TokenInterceptor} from './core/_helpers/token.interceptor';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HomeComponent } from './views/pages/home/home.component';

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true
};

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppBlankComponent,
    AppSidebarComponent,
    PageTitleComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    PerfectScrollbarModule,
    SharedModule,
    NgMultiSelectDropDownModule.forRoot(),
    ToastrModule.forRoot(),
    SortablejsModule.forRoot({animation: 150}),
    BreadcrumbsModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    QuillModule.forRoot(),
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatTooltipModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [PageTitleComponent, TranslateModule],

  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    // {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    BreadcrumbsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
