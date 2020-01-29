import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Attribute, AttributeAdapter} from '../../../../core/_models/attribute';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AttributeApi} from '../../../../core/_api/attribute.api';
import {MatDialog} from '@angular/material';
import {handlingError} from '../../../../core/_helpers/handling-error.service';
import {ControlPageService} from '../../../../core/_helpers/control-page.service';

@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html',
})
export class AttributeComponent implements OnInit {
  routeName = 'attributes';
  public form: FormGroup;

  id: any;
  image: any;
  attributeId: any;
  isItemEdit = false;
  isLoading = false;
  item: Attribute;

  @ViewChild('openDialogImage', {static: false}) openDialogImage: TemplateRef<any>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private controlPageService: ControlPageService,
    private toastr: ToastrService,
    private attributeApi: AttributeApi,
    private attributeAdapter: AttributeAdapter,
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.setBreadcrumbs();
    this.form = this.fb.group({
      nameEn: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])],
      nameAr: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],
      key: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],
      active: [true],
    });

    this.route.params.subscribe(params => {
      if (this.router.url.includes('/create')) {
      } else {
        this.id = params.attributeId;
        this.isItemEdit = true;
        this.get();
      }
    });

  }

  get() {

    this.attributeApi.getById(this.id).subscribe((data: any) => {
        this.item = this.attributeAdapter.adapt(data.data);
        this.form.controls.nameEn.setValue(this.item.nameEn);
        this.form.controls.nameAr.setValue(this.item.nameAr);
        this.form.controls.key.setValue(this.item.key);
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
      key: this.form.controls.key.value,
    };

    this.isLoading = true;
    if (this.isItemEdit) {
      this.update(item);
    } else {
      this.create(item);
    }
    this.isLoading = false;
  }

  create(attribute) {
    this.attributeApi.create(attribute).subscribe((data: any) => {
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
    this.attributeApi.update(item).subscribe((data: any) => {
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
