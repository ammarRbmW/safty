import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {Catalog} from '../../../../core/_models/catalog';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ControlPageService} from '../../../../core/_helpers/control-page.service';
import {BreadcrumbsService} from 'ng2-breadcrumbs';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material';
import {CatalogApi} from '../../../../core/_api/catalog.api';
import {DialogComponent} from '../../../shared/dialog/dialog.component';
import {handlingError} from '../../../../core/_helpers/handling-error.service';
import {ListAnimation} from '../../../shared/animations/list';

@Component({
  selector: 'app-catalog-list',
  templateUrl: './catalog-list.component.html',
  animations: ListAnimation
})
export class CatalogListComponent implements OnInit {
  apiUrl = environment.apiUrl;
  url: string = this.apiUrl + '/catalogs';
  catalogs: Catalog[] = [];
  routeName = 'catalogs';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public controlPageService: ControlPageService,
    private breadcrumbsService: BreadcrumbsService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    public catalogApi: CatalogApi,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(params => {
      this.catalogApi.list().subscribe(
        (data: any) => {
          this.catalogs = data;
          console.log(this.catalogs);
          this.controlPageService.setCreateLink('/' + this.routeName + '/create');
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
        this.catalogApi.delete(itemId).subscribe((data: any) => {
            const temp = [...this.catalogs];
            temp.splice(index, 1);
            this.catalogs = temp;
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
