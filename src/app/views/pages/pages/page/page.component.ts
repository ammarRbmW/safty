import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material';
import {handlingError} from '../../../../core/_helpers/handling-error.service';
import {ControlPageService} from '../../../../core/_helpers/control-page.service';
import {Page, PageAdapter, PageDataAdapter} from '../../../../core/_models/page';
import {PageApi} from '../../../../core/_api/page.api';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
})
export class PageComponent implements OnInit {
  routeName = 'pages';
  public form: FormGroup;
  apiUrl = environment.apiUrl;

  id: any;
  image: any;
  isItemEdit = false;
  isLoading = false;
  page: Page;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private controlPageService: ControlPageService,
    private toastr: ToastrService,
    private pageApi: PageApi,
    private pageAdapter: PageAdapter,
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
        this.id = params.pageId;
        this.isItemEdit = true;
        this.get();
      }
    });

  }

  get() {

    this.pageApi.getById(this.id).subscribe((data: any) => {
        this.page = this.pageAdapter.adapt(data.data);
        this.form.controls.nameEn.setValue(this.page.nameEn);
        this.form.controls.nameAr.setValue(this.page.nameAr);
        this.form.controls.code.setValue(this.page.code);
        this.id = this.page.id;

      },
      (error: any) => {
        handlingError(error, this.toastr, this.router);
      },
      () => {
        this.setBreadcrumbs();
      });
  }

  store() {

    const page = {
      nameEn: this.form.controls.nameEn.value,
      nameAr: this.form.controls.nameAr.value,
      code: this.form.controls.code.value,
    };

    this.isLoading = true;
    if (this.isItemEdit) {
      this.update(page);
    } else {
      this.create(page);
    }
    this.isLoading = false;
  }

  create(page) {
    this.pageApi.create(page).subscribe((data: any) => {
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

  update(page) {

    page.id = this.id;
    this.pageApi.update(page).subscribe((data: any) => {
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
