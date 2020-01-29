import {Component, OnInit} from '@angular/core';
import {ListAnimation} from '../../../shared/animations/list';
import {environment} from '../../../../../environments/environment';
import {Catalog} from '../../../../core/_models/catalog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ControlPageService} from '../../../../core/_helpers/control-page.service';
import {BreadcrumbsService} from 'ng2-breadcrumbs';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material';
import {CatalogApi} from '../../../../core/_api/catalog.api';
import {DialogComponent} from '../../../shared/dialog/dialog.component';
import {handlingError} from '../../../../core/_helpers/handling-error.service';
import {ProductApi} from '../../../../core/_api/product.api';
import {Product} from '../../../../core/_models/product';

@Component({
  selector: 'app-catalog-product-list',
  templateUrl: './catalog-product-list.component.html',
  animations: ListAnimation
})
export class CatalogProductListComponent implements OnInit {
  apiUrl = environment.apiUrl;
  url: string = this.apiUrl + '/products';
  catalogId = null;
  products: Product[] = [];
  routeName = 'products';
  productsSelect = new FormControl();
  public form: FormGroup;

  allProducts = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private controlPageService: ControlPageService,
    private breadcrumbsService: BreadcrumbsService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    public catalogApi: CatalogApi,
    public productApi: ProductApi,
    private route: ActivatedRoute,
  ) {


    this.route.params.subscribe(params => {
      this.catalogId = params.catalogId;
      this.getProductsByCatalogId();
    });
    this.form = this.fb.group({
      product_id: [null, Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    this.setBreadcrumbs();
    this.getAllProducts();
  }

  getAllProducts() {
    this.productApi.getAll().subscribe((data: any) => {
      this.allProducts = data;
    });
  }

  getProductsByCatalogId() {
    this.productApi.getProductsByCatalogId(this.catalogId).subscribe(
      (data: any) => {
        this.products = data;
      }
    );
  }


  addProductToCatalog() {
    const productId = this.productsSelect.value.id;
    this.productApi.addProductToCatalog(this.catalogId, productId).subscribe((data: any) => {
        this.toastr.success('Item added successfully.', 'Success');
        this.getProductsByCatalogId();
      },
      (error: any) => {
        handlingError(error, this.toastr, this.router);
      },
      () => {
      });

  }

  delete(itemId, index) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.catalogApi.delete(itemId).subscribe((data: any) => {
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
    const breadcrumbArray = [];
    breadcrumbArray[0] = {label: 'Home', url: '/home', params: []};
    breadcrumbArray[1] = {label: this.routeName, url: '/' + this.routeName, params: []};

    this.controlPageService.setBreadcrumb(breadcrumbArray);
  }



}
