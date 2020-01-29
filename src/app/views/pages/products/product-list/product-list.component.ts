import {Component, OnInit} from '@angular/core';
import {ListAnimation} from '../../../shared/animations/list';
import {environment} from '../../../../../environments/environment';
import {Product} from '../../../../core/_models/product';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ControlPageService} from '../../../../core/_helpers/control-page.service';
import {BreadcrumbsService} from 'ng2-breadcrumbs';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material';
import {ProductApi} from '../../../../core/_api/product.api';
import {CategoryApi} from '../../../../core/_api/category.api';
import {DialogComponent} from '../../../shared/dialog/dialog.component';
import {handlingError} from '../../../../core/_helpers/handling-error.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',

  animations: ListAnimation
})
export class ProductListComponent implements OnInit {

  apiUrl = environment.apiUrl;
  url: string = this.apiUrl + '/products';
  products: Product[] = [];
  routeName = 'products';
  parentCategoryId = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public controlPage: ControlPageService,
    private breadcrumbsService: BreadcrumbsService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    public productApi: ProductApi,
    public categoryApi: CategoryApi,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(params => {
      this.parentCategoryId = params.parentCategoryId;
      this.productApi.list(this.parentCategoryId).subscribe(
        (data: any) => {
          this.products = data;
          this.controlPage.setCreateLink('/' + this.routeName + '/create/' + this.parentCategoryId);
          this.controlPage.setCreateSubItemLink('');
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
        this.productApi.delete(itemId).subscribe((data: any) => {
            const temp = [...this.products];
            temp.splice(index, 1);
            this.products = temp;
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

