import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {Ad} from '../../../../core/_models/ad';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ControlPageService} from '../../../../core/_helpers/control-page.service';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material';
import {AdApi} from '../../../../core/_api/ad.api';
import {DialogComponent} from '../../../shared/dialog/dialog.component';
import {handlingError} from '../../../../core/_helpers/handling-error.service';
import {ListAnimation} from '../../../shared/animations/list';

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  animations: ListAnimation
})
export class AdListComponent implements OnInit {
  apiUrl = environment.apiUrl;
  url: string = this.apiUrl + '/ads';
  ads: Ad[] = [];
  routeName = 'ads';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public controlPageService: ControlPageService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    public adApi: AdApi,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(params => {
      this.adApi.list().subscribe(
        (data: any) => {
          this.ads = data;
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
        this.adApi.delete(itemId).subscribe((data: any) => {
            const temp = [...this.ads];
            temp.splice(index, 1);
            this.ads = temp;
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

