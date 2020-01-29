import {Component, OnInit} from '@angular/core';
import {ListAnimation} from '../../../shared/animations/list';
import {environment} from '../../../../../environments/environment';
import {Brand} from '../../../../core/_models/brand';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ControlPageService} from '../../../../core/_helpers/control-page.service';
import {BreadcrumbsService} from 'ng2-breadcrumbs';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material';
import {BrandApi} from '../../../../core/_api/brand.api';
import {DialogComponent} from '../../../shared/dialog/dialog.component';
import {handlingError} from '../../../../core/_helpers/handling-error.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  animations: ListAnimation
})
export class BrandListComponent implements OnInit {
  apiUrl = environment.apiUrl;
  url: string = this.apiUrl + '/brands';
  brands: Brand[] = [];
  routeName = 'brands';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public controlPage: ControlPageService,
    private breadcrumbsService: BreadcrumbsService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    public brandApi: BrandApi,
    private route: ActivatedRoute,
    private controlPageService: ControlPageService,
  ) {
    this.route.params.subscribe(params => {
      this.brandApi.list().subscribe(
        (data: any) => {
          this.brands = data;
          this.controlPage.setCreateLink('/' + this.routeName + '/create');
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
        this.brandApi.delete(itemId).subscribe((data: any) => {
            const temp = [...this.brands];
            temp.splice(index, 1);
            this.brands = temp;
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
