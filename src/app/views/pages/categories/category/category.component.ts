import {ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Category, CategoryAdapter, CategoryData, CategoryDataAdapter} from '../../../../core/_models/category';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UploadFileService} from '../../../../core/_api';
import {BreadcrumbsService} from 'ng2-breadcrumbs';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {CategoryApi} from '../../../../core/_api/category.api';
import {MatDialog} from '@angular/material';
import {environment} from '../../../../../environments/environment';
import {handlingError} from '../../../../core/_helpers/handling-error.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
})
export class CategoryComponent implements OnInit {
  routeName = 'categories';
  url_image = environment.apiUrl + '/upload/categories';
  public form: FormGroup;

  id: any;
  image: any;
  parentCategoryId: any;
  isItemEdit = false;
  isLoading = false;
  item: Category;

  @ViewChild('openDialogImage', {static: false}) openDialogImage: TemplateRef<any>;
  fileImage: File;
  fixedWidth = '412';
  fixedHeight = '275';
  public imageUpload: any = {
    oldImage: '',
    upload_image_disable: true,
    showSpinnerImage: false,
    configImage: {
      ImageName: 'Category Image',
      AspectRatios: [this.fixedWidth + ':' + this.fixedHeight],
      File: this.fileImage,
      ImageType: 'image/jpeg'
    }
  };

  constructor(
    private fb: FormBuilder,
    public uploadService: UploadFileService,
    private router: Router,
    private breadcrumbsService: BreadcrumbsService,
    private toastr: ToastrService,
    private categoryApi: CategoryApi,
    private categoryAdapter: CategoryAdapter,
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.setBreadcrumbs();
    this.form = this.fb.group({
      nameEn: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])],
      nameAr: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],
      code: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],
      active: [true],
    });

    this.route.params.subscribe(params => {
      if (this.router.url.includes('/create')) {
        this.parentCategoryId = params.parentCategoryId;
      } else {
        this.id = params.categoryId;
        this.isItemEdit = true;
        this.get();
      }
    });

  }

  get() {

    this.categoryApi.getById(this.id).subscribe((data: any) => {
        this.item = this.categoryAdapter.adapt(data.data);
        this.parentCategoryId = this.item.parentCategoryId;
        this.form.controls.nameEn.setValue(this.item.nameEn);
        this.form.controls.nameAr.setValue(this.item.nameAr);
        this.form.controls.code.setValue(this.item.code);
        this.image = this.item.image;
        this.id = this.item.id;
        this.imageUpload.oldImage = this.item.image;
      },
      (error: any) => {
        handlingError(error, this.toastr, this.router);
      },
      () => {
        this.setBreadcrumbs();
      });
  }

  store() {
    const item = {
      nameEn: this.form.controls.nameEn.value,
      nameAr: this.form.controls.nameAr.value,
      code: this.form.controls.code.value,
      image: this.image,
    };
    if (this.parentCategoryId && this.parentCategoryId !== '0') {
      // @ts-ignore
      item.parentCategoryId = this.parentCategoryId;
    }

    this.isLoading = true;
    if (this.isItemEdit) {
      this.update(item);
    } else {
      this.create(item);
    }
    this.isLoading = false;
  }

  create(category) {
    this.categoryApi.create(category).subscribe((data: any) => {
        this.form.reset();
        this.toastr.success('Item created successfully.', 'Success');
        this.router.navigate([`/` + this.routeName + '/' + this.parentCategoryId]);
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
    this.categoryApi.update(item).subscribe((data: any) => {
        this.form.reset();
        this.toastr.success('Item updated successfully', 'success!');
        this.router.navigate([`/` + this.routeName + '/' + this.parentCategoryId]);
      },
      (error: any) => {
        handlingError(error, this.toastr, this.router);
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      });
  }


  setBreadcrumbs() {
    const finalArray = [];
    finalArray[0] = {label: 'Home', url: '/home', params: []};
    finalArray[1] = {label: this.routeName, url: '/' + this.routeName, params: []};
    finalArray[2] = {
      label: this.isItemEdit ? 'Update ' + this.routeName : 'Create ' + this.routeName,
      url: '',
      params: []
    };
    this.breadcrumbsService.store(finalArray);
  }

  readURL(event: any, type: any): void {
    this.uploadService.readURL(event, this.imageUpload.configImage, this.dialog, this.openDialogImage, type);
  }

  public getEditedFile(file: File, type: any) {
    if (type === 'image') {
      this.imageUpload.showSpinnerImage = true;
      this.uploadService.postFile(this.url_image, file).subscribe((data: any) => {
        // do something, if upload success
        this.image = data.data[0];
        this.imageUpload = this.uploadService.afterUpload(this.imageUpload, data);
      }, error => {
        console.log(error);
      });
    }
  }


}
