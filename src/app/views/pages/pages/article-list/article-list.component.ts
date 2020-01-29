import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {Article} from '../../../../core/_models/article';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ControlPageService} from '../../../../core/_helpers/control-page.service';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material';
import {ArticleApi} from '../../../../core/_api/article.api';
import {DialogComponent} from '../../../shared/dialog/dialog.component';
import {handlingError} from '../../../../core/_helpers/handling-error.service';
import {ListAnimation} from '../../../shared/animations/list';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  animations: ListAnimation
})
export class ArticleListComponent implements OnInit {
  apiUrl = environment.apiUrl;
  url: string = this.apiUrl + '/articles';
  articles: Article[] = [];
  routeName = 'articles';
  articlePageId: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public controlPageService: ControlPageService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    public articleApi: ArticleApi,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(params => {
      this.articleApi.list().subscribe(
        (data: any) => {
          this.articles = data;
          this.articlePageId = params.articlePageId;
          this.controlPageService.setCreateLink('/pages/' + this.routeName + '/create/' + this.articlePageId);
        }
      );
    });
  }

  ngOnInit(): void {
    this.setBreadcrumbs();
  }

  delete(itemId, index) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.articleApi.delete(itemId).subscribe((data: any) => {
            const temp = [...this.articles];
            temp.splice(index, 1);
            this.articles = temp;
            this.toastr.success('Item deleted successfully.', 'Success');
          },
          (error: any) => {
            handlingError(error, this.toastr, this.router);
          },
          () => {
          });
      }
    });
  }

  setBreadcrumbs() {
    const breadcrumbArray = [];
    breadcrumbArray[0] = {label: 'Home', url: '/home', params: []};
    breadcrumbArray[1] = {label: this.routeName, url: '/' + this.routeName, params: []};

    this.controlPageService.setBreadcrumb(breadcrumbArray);
  }

}

