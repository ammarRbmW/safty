import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {Size} from '../../../../core/_models/size';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ControlPageService} from '../../../../core/_helpers/control-page.service';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material';
import {SizeApi} from '../../../../core/_api/size.api';
import {DialogComponent} from '../../../shared/dialog/dialog.component';
import {handlingError} from '../../../../core/_helpers/handling-error.service';
import {ListAnimation} from '../../../shared/animations/list';

@Component({
  selector: 'app-size-list',
  templateUrl: './size-list.component.html',
  animations: ListAnimation
})
export class SizeListComponent implements OnInit {
  apiUrl = environment.apiUrl;
  url: string = this.apiUrl + '/sizes';
  sizes: Size[] = [];
  routeName = 'sizes';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public controlPageService: ControlPageService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    public sizeApi: SizeApi,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(params => {
      this.sizeApi.list().subscribe(
        (data: any) => {
          this.sizes = data;
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
        this.sizeApi.delete(itemId).subscribe((data: any) => {
            const temp = [...this.sizes];
            temp.splice(index, 1);
            this.sizes = temp;
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

