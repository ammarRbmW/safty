import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageListComponent} from './page-list/page-list.component';
import {PageComponent} from './page/page.component';
import {ArticleListComponent} from './article-list/article-list.component';
import {ArticleComponent} from './article/article.component';

const routes: Routes = [
  {
    path: '',
    component: PageListComponent,
  }, {
    path: 'create',
    component: PageComponent,
  }, {
    path: 'edit/:pageId',
    component: PageComponent,
  }, {
    path: 'articles/:articlePageId',
    component: ArticleListComponent,
  }, {
    path: 'articles/create/:articlePageId',
    component: ArticleComponent,
  }, {
    path: 'articles/edit/:articlePageId/:articleId',
    component: ArticleComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
