import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Catalog, CatalogAdapter} from '../../../../core/_models/catalog';
import {ActivatedRoute, Router} from '@angular/router';
import {ControlPageService} from '../../../../core/_helpers/control-page.service';
import {ToastrService} from 'ngx-toastr';
import {CatalogApi} from '../../../../core/_api/catalog.api';
import {MatDialog} from '@angular/material';
import {handlingError} from '../../../../core/_helpers/handling-error.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
})
export class CatalogComponent implements OnInit {
  routeName = 'catalogs';
  public form: FormGroup;

  id: any;
  image: any;
  isItemEdit = false;
  isLoading = false;
  item: Catalog;

  @ViewChild('openDialogImage', {static: false}) openDialogImage: TemplateRef<any>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private controlPageService: ControlPageService,
    private toastr: ToastrService,
    private catalogApi: CatalogApi,
    private catalogAdapter: CatalogAdapter,
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
      } else {
        this.id = params.catalogId;
        this.isItemEdit = true;
        this.get();
      }
    });

  }

  get() {

    this.catalogApi.getById(this.id).subscribe((data: any) => {
        this.item = this.catalogAdapter.adapt(data.data);
        this.form.controls.nameEn.setValue(this.item.nameEn);
        this.form.controls.nameAr.setValue(this.item.nameAr);
        this.form.controls.code.setValue(this.item.code);
        this.id = this.item.id;
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
    };

    this.isLoading = true;
    if (this.isItemEdit) {
      this.update(item);
    } else {
      this.create(item);
    }
    this.isLoading = false;
  }

  create(catalog) {
    this.catalogApi.create(catalog).subscribe((data: any) => {
        this.form.reset();
        this.toastr.success('Item updated successfully.', 'Success');
        this.router.navigate([`/` + this.routeName]);
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
    this.catalogApi.update(item).subscribe((data: any) => {
        this.form.reset();
        this.toastr.success('Item updated successfully', 'success!');
        this.router.navigate([`/` + this.routeName]);
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
    const breadcrumbArray = [];
    breadcrumbArray[0] = {label: 'Home', url: '/home', params: []};
    breadcrumbArray[1] = {label: this.routeName, url: '/' + this.routeName, params: []};
    breadcrumbArray[2] = {
      label: this.isItemEdit ? 'Update ' + this.routeName : 'Create ' + this.routeName,
      url: '',
      params: []
    };
    this.controlPageService.setBreadcrumb(breadcrumbArray);
  }

}
