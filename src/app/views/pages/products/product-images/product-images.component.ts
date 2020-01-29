import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material';
import {handlingError} from '../../../../core/_helpers/handling-error.service';
import {ControlPageService} from '../../../../core/_helpers/control-page.service';
import {UploadFileService} from '../../../../core/_api';
import {environment} from '../../../../../environments/environment';
import {DialogComponent} from '../../../shared/dialog/dialog.component';
import {ProductApi} from '../../../../core/_api/product.api';
import {ListAnimation} from '../../../shared/animations/list';

@Component({
  selector: 'app-product-images',
  templateUrl: './product-images.component.html',
  animations: ListAnimation

})
export class ProductImagesComponent implements OnInit {
  routeName = 'product-images';
  public form: FormGroup;
  apiUrl = environment.apiUrl;
  uploadImageUrl = this.apiUrl + '/upload/product-images';

  id: any;
  image: any;
  isLoading = false;
  @Input() productImages = [];
  @Input() productId: number;

  @ViewChild('openDialogImage', {static: false}) openDialogImage: TemplateRef<any>;
  fileImage: File;
  fixedWidth = '500';
  fixedHeight = '500';
  public imagesUpload: any = {
    oldImage: '',
    upload_image_disable: true,
    showSpinnerImage: false,
    configImage: {
      ImageName: 'Product Images',
      AspectRatios: [this.fixedWidth + ':' + this.fixedHeight],
      File: this.fileImage,
      ImageType: 'image/png'
    }
  };

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

  }

  store() {
    this.productApi.createProductImage(this.productId, this.image).subscribe((data: any) => {
        this.toastr.success('Item Created successfully.', 'Success');
        this.productImages = data.data.images;
        this.image = null;
        this.imagesUpload.oldImage = null;
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
        this.productApi.deleteProductImage(itemId).subscribe((data: any) => {
            const temp = [...this.productImages];
            temp.splice(index, 1);
            this.productImages = temp;
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

  readURL(event: any, type: any): void {
    this.uploadService.readURL(event, this.imagesUpload.configImage, this.dialog, this.openDialogImage, type);
  }

  public getEditedFile(file: File, type: any) {
    this.imagesUpload.showSpinnerImage = true;
    this.uploadService.postFile(this.uploadImageUrl, file).subscribe((data: any) => {
      // do something, if upload success
      this.image = data.data[0];
      this.imagesUpload = this.uploadService.afterUpload(this.imagesUpload, data);
      this.store();
    }, error => {
      console.log(error);
    });
  }
}
