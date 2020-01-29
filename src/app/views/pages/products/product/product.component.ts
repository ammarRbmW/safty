import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Product, ProductAdapter} from '../../../../core/_models/product';
import {UploadFileService} from '../../../../core/_api';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ProductApi} from '../../../../core/_api/product.api';
import {MatDialog} from '@angular/material';
import {handlingError} from '../../../../core/_helpers/handling-error.service';
import {Brand} from '../../../../core/_models/brand';
import {BrandApi} from '../../../../core/_api/brand.api';
import {ColorApi} from '../../../../core/_api/color.api';
import {Color} from '../../../../core/_models/color';
import {SizeApi} from '../../../../core/_api/size.api';
import {Size} from '../../../../core/_models/size';
import {AttributeApi} from '../../../../core/_api/attribute.api';
import {Attribute} from '../../../../core/_models/attribute';
import {ControlPageService} from '../../../../core/_helpers/control-page.service';
import {CategoryApi} from '../../../../core/_api/category.api';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  routeName = 'products';
  apiUrl = environment.apiUrl;
  uploadImageUrl = environment.apiUrl + '/upload/products';
  public form: FormGroup;

  id = 0;
  mainPhoto: any;
  parentCategoryId: any;
  isItemEdit = false;
  productImages = [];
  isLoading = false;
  item: Product;
  brands: Brand[];
  colors: Color[];
  sizes: Size[];
  attributes: Attribute[];
  items = [];
  @ViewChild('openDialogImage', {static: false}) openDialogImage: TemplateRef<any>;
  fileImage: File;
  fixedWidth = '500';
  fixedHeight = '500';
  public imageUpload: any = {
    oldImage: '',
    upload_image_disable: true,
    showSpinnerImage: false,
    configImage: {
      ImageName: 'Product Image',
      AspectRatios: [this.fixedWidth + ':' + this.fixedHeight],
      File: this.fileImage,
      ImageType: 'image/png'
    }
  };

  constructor(
    private fb: FormBuilder,
    public uploadService: UploadFileService,
    private router: Router,
    private controlPageService: ControlPageService,
    private toastr: ToastrService,
    private productApi: ProductApi,
    private categoryApi: CategoryApi,
    private productAdapter: ProductAdapter,
    private brandApi: BrandApi,
    private colorApi: ColorApi,
    private attributeApi: AttributeApi,
    private sizeApi: SizeApi,
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ) {
    this.getBrands();
    this.getColors();
    this.getSizes();
    this.getAttributes();
    this.controlPageService.setPageTitle(this.routeName);

  }


  ngOnInit() {

    this.setBreadcrumb();
    this.form = this.fb.group({
      sku: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(10)])],
      badge: [null, Validators.compose([Validators.minLength(1), Validators.maxLength(10)])],
      active: [true],
      lowStockThreshold: [null, Validators.compose([Validators.required, Validators.min(0)])],
      brandsId: [null, Validators.compose([Validators.required, Validators.min(0)])],
      virtual: [false],
      nameEn: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(255)])],
      nameAr: [null, Validators.compose([Validators.minLength(2), Validators.maxLength(255)])],
      descriptionEn: [null, Validators.compose([Validators.required, Validators.minLength(2)])],
      descriptionAr: [null, Validators.compose([Validators.minLength(2)])],
      specificationsEn: [null, Validators.compose([Validators.required, Validators.minLength(2)])],
      specificationsAr: [null, Validators.compose([Validators.minLength(2)])],
      items: new FormArray([])

    });

    this.route.params.subscribe(params => {
      this.parentCategoryId = params.parentCategoryId;
      if (this.router.url.includes('/create')) {
        this.parentCategoryId = params.parentCategoryId;
      } else {
        this.id = params.productId;
        this.isItemEdit = true;
        this.get();
      }
    });

  }

  store() {
    const item = {
      sku: this.form.controls.sku.value,
      badge: this.form.controls.badge.value,
      active: this.form.controls.active.value,
      lowStockThreshold: this.form.controls.lowStockThreshold.value,
      brandsId: this.form.controls.brandsId.value,
      virtual: this.form.controls.virtual.value,
      nameEn: this.form.controls.nameEn.value,
      nameAr: this.form.controls.nameAr.value,
      descriptionEn: this.form.controls.descriptionEn.value,
      descriptionAr: this.form.controls.descriptionAr.value,
      specificationsEn: this.form.controls.specificationsEn.value,
      specificationsAr: this.form.controls.specificationsAr.value,
      mainPhoto: this.mainPhoto,
      items: this.items
    };
    this.isLoading = true;
    if (this.isItemEdit) {
      this.update(item);
    } else {
      this.create(item);
    }
  }

  displayArray($event) {
    this.items = $event;
  }

  get() {

    this.productApi.getById(this.id).subscribe((data: any) => {
        this.item = this.productAdapter.adapt(data.data);
        this.items = this.item.items;
        this.productImages = this.item.images;
        this.form.controls.sku.setValue(this.item.sku);
        this.form.controls.badge.setValue(this.item.badge);
        this.form.controls.active.setValue(this.item.active);
        this.form.controls.lowStockThreshold.setValue(this.item.lowStockThreshold);
        if (this.item.brand) {
          this.form.controls.brandsId.setValue(this.item.brand.id);
        }
        this.form.controls.virtual.setValue(this.item.virtual);
        this.form.controls.nameEn.setValue(this.item.nameEn);
        this.form.controls.nameAr.setValue(this.item.nameAr);
        this.form.controls.descriptionEn.setValue(this.item.descriptionEn);
        this.form.controls.descriptionAr.setValue(this.item.descriptionAr);
        this.form.controls.specificationsEn.setValue(this.item.specificationsEn);
        this.form.controls.specificationsAr.setValue(this.item.specificationsAr);
        this.mainPhoto = this.item.mainPhoto;
        this.id = this.item.id;
        this.imageUpload.oldImage = this.apiUrl + this.item.mainPhoto;

      },
      (error: any) => {
        handlingError(error, this.toastr, this.router);
      },
      () => {
        this.setBreadcrumb();
      });
  }

  create(product) {
    this.productApi.create(product).subscribe((data: any) => {
        this.form.reset();
        this.toastr.success('Product created successfully.', 'Success');

        if (this.parentCategoryId) {
          this.addProductToCategory(this.parentCategoryId, data.data.id);
        }
        this.router.navigate([`/products/categories/` + this.parentCategoryId]);
      },
      (error: any) => {
        handlingError(error, this.toastr, this.router);
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      });
  }

  update(item) {

    item.id = this.id;
    this.productApi.update(item).subscribe((data: any) => {
        this.form.reset();
        this.toastr.success('Item updated successfully', 'success!');
        this.router.navigate([`/products/categories/` + this.parentCategoryId]);
      },
      (error: any) => {
        handlingError(error, this.toastr, this.router);
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      });
  }

  addProductToCategory(categoryId, ProductId) {

    this.categoryApi.addProductToCategory(categoryId, ProductId).subscribe((data: any) => {
        this.form.reset();
        this.toastr.success('Item updated successfully.', 'Success');
      },
      (error: any) => {
        handlingError(error, this.toastr, this.router);
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      });
  }


  getBrands() {

    this.brandApi.list().subscribe((data: any) => {
        this.brands = data;
      },
      (error: any) => {
        handlingError(error, this.toastr, this.router);
      });
  }

  getColors() {

    this.colorApi.list().subscribe((data: any) => {
        this.colors = data;
      },
      (error: any) => {
        handlingError(error, this.toastr, this.router);
      });
  }

  getSizes() {

    this.sizeApi.list().subscribe((data: any) => {
        this.sizes = data;
      },
      (error: any) => {
        handlingError(error, this.toastr, this.router);
      });
  }

  getAttributes() {

    this.attributeApi.list().subscribe((data: any) => {
        this.attributes = data;
      },
      (error: any) => {
        handlingError(error, this.toastr, this.router);
      });
  }

  setBreadcrumb() {
    const breadcrumbArray = [{label: 'Home', url: '/home', params: []}, {label: 'Home1', url: '/home', params: []}];
    breadcrumbArray[0] = {label: 'Home', url: '/home', params: []};
    breadcrumbArray[1] = {label: this.routeName, url: '/' + this.routeName, params: []};
    breadcrumbArray[2] = {
      label: this.isItemEdit ? 'Update ' + this.routeName : 'Create ' + this.routeName,
      url: '',
      params: []
    };
    this.controlPageService.setBreadcrumb(breadcrumbArray);
  }

  readURL(event: any, type: any): void {
    this.uploadService.readURL(event, this.imageUpload.configImage, this.dialog, this.openDialogImage, type);
  }

  public getEditedFile(file: File, type: any) {
    this.imageUpload.showSpinnerImage = true;
    this.uploadService.postFile(this.uploadImageUrl, file).subscribe((data: any) => {
      // do something, if upload success
      this.mainPhoto = data.data[0];
      this.imageUpload = this.uploadService.afterUpload(this.imageUpload, data);
    }, error => {
      console.log(error);
    });
  }


}
