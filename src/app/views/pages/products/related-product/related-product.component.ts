import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ListAnimation} from '../../../shared/animations/list';
import {FormControl, FormGroup} from '@angular/forms';
import {environment} from '../../../../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import {ControlPageService} from '../../../../core/_helpers/control-page.service';
import {UploadFileService} from '../../../../core/_api';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material';
import {ProductApi} from '../../../../core/_api/product.api';
import {handlingError} from '../../../../core/_helpers/handling-error.service';
import {DialogComponent} from '../../../shared/dialog/dialog.component';
import {Product} from '../../../../core/_models/product';

@Component({
  selector: 'app-related-product',
  templateUrl: './related-product.component.html',
  animations: ListAnimation

})
export class RelatedProductComponent implements OnInit {
  public form: FormGroup;
  apiUrl = environment.apiUrl;
  isLoading = false;

  relatedProducts: Product[] = [];
  products: Product[] = [];
  @Input() productId: number;
  relatedProductId: number;
  relatedProductsSelect = new FormControl();

  constructor(
    private router: Router,
    private controlPageService: ControlPageService,
    private uploadService: UploadFileService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private productApi: ProductApi,
  ) {

  }

  ngOnInit() {
    this.getRelatedProducts();
    this.allProducts();
  }

  getRelatedProducts() {
    this.productApi.relatedProductsList(this.productId).subscribe(
      (data: any) => {
        this.relatedProducts = data;
      }
    );
  }

  allProducts() {
    this.productApi.getAll().subscribe(
      (data: any) => {
        this.products = data;
      }
    );
  }

  addNewRelated() {
    this.relatedProductId = this.relatedProductsSelect.value;
    console.log(this.relatedProductsSelect.value);
    this.productApi.createRelatedProduct(this.productId, this.relatedProductId).subscribe((data: any) => {
        this.toastr.success('Item Created successfully.', 'Success');
        this.getRelatedProducts();

      },
      (error: any) => {
        handlingError(error, this.toastr, this.router);
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      });
  }

  delete(itemId, index) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productApi.deleteRelatedProduct(itemId).subscribe((data: any) => {
            const temp = [...this.relatedProducts];
            temp.splice(index, 1);
            this.relatedProducts = temp;
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

}
