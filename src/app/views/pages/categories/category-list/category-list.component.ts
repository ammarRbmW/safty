import {Component, OnInit} from '@angular/core';
import {ListAnimation} from '../../../shared/animations/list';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ControlPageService} from '../../../../core/_helpers/control-page.service';
import {BreadcrumbsService} from 'ng2-breadcrumbs';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material';
import {CategoryApi} from '../../../../core/_api/category.api';
import {Category} from '../../../../core/_models/category';
import {environment} from '../../../../../environments/environment';
import {DialogComponent} from '../../../shared/dialog/dialog.component';
import {handlingError} from '../../../../core/_helpers/handling-error.service';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  animations: ListAnimation
})
export class CategoryListComponent implements OnInit {
  apiUrl = environment.apiUrl;
  url: string = this.apiUrl + '/categories';
  categories: Category[] = [];
  routeName = 'categories';
  parentCategoryId = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public controlPage: ControlPageService,
    private breadcrumbsService: BreadcrumbsService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    public categoryApi: CategoryApi,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(params => {
      this.parentCategoryId = params.parentCategoryId;
      if (!params.parentCategoryId) {
        this.parentCategoryId = 0;
      }
      if (this.parentCategoryId > 0) {
        this.categoryApi.listOfProducts(this.parentCategoryId).subscribe(
          (data: any) => {
            if (data.length > 0) {
              this.router.navigate([`/products/categories/` + this.parentCategoryId]);
            }
          }
        );
      }
      this.categoryApi.list(this.parentCategoryId).subscribe(
        (data: any) => {
          this.categories = data;
          if (this.categories.length > 0) {
            const array = Object.getOwnPropertyNames(this.categories[0]);
            this.controlPage.setCreateLink('/' + this.routeName + '/create/' + this.parentCategoryId);
          } else {
            this.controlPage.setCreateLink('/' + this.routeName + '/create/' + this.parentCategoryId);
            this.controlPage.setCreateSubItemLink('/products/create/' + this.parentCategoryId);
          }
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
        this.categoryApi.delete(itemId).subscribe((data: any) => {
            const temp = [...this.categories];
            temp.splice(index, 1);
            this.categories = temp;
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
    const finalArray = [];
    finalArray[0] = {label: 'Home', url: '/home', params: []};
    finalArray[1] = {label: this.routeName, url: '/' + this.routeName, params: []};

    this.breadcrumbsService.store(finalArray);
  }


}

