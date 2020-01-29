import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {Color} from '../../../../core/_models/color';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ControlPageService} from '../../../../core/_helpers/control-page.service';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material';
import {ColorApi} from '../../../../core/_api/color.api';
import {DialogComponent} from '../../../shared/dialog/dialog.component';
import {handlingError} from '../../../../core/_helpers/handling-error.service';
import {ListAnimation} from '../../../shared/animations/list';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  animations: ListAnimation
})
export class ColorListComponent implements OnInit {
  apiUrl = environment.apiUrl;
  url: string = this.apiUrl + '/colors';
  colors: Color[] = [];
  routeName = 'colors';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public controlPageService: ControlPageService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    public colorApi: ColorApi,
    private route: ActivatedRoute,
  ) {

    this.route.params.subscribe(params => {
      this.colorApi.list().subscribe(
        (data: any) => {
          this.colors = data;
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
        this.colorApi.delete(itemId).subscribe((data: any) => {
            const temp = [...this.colors];
            temp.splice(index, 1);
            this.colors = temp;
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

