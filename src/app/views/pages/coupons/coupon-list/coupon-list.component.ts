import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {Coupon} from '../../../../core/_models/coupon';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ControlPageService} from '../../../../core/_helpers/control-page.service';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material';
import {CouponApi} from '../../../../core/_api/coupon.api';
import {DialogComponent} from '../../../shared/dialog/dialog.component';
import {handlingError} from '../../../../core/_helpers/handling-error.service';
import {ListAnimation} from '../../../shared/animations/list';

@Component({
  selector: 'app-coupon-list',
  templateUrl: './coupon-list.component.html',
  animations: ListAnimation
})
export class CouponListComponent implements OnInit {
  apiUrl = environment.apiUrl;
  url: string = this.apiUrl + '/coupons';
  coupons: Coupon[] = [];
  routeName = 'coupons';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public controlPageService: ControlPageService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    public couponApi: CouponApi,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(params => {
      this.couponApi.list().subscribe(
        (data: any) => {
          this.coupons = data;
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
        this.couponApi.delete(itemId).subscribe((data: any) => {
            const temp = [...this.coupons];
            temp.splice(index, 1);
            this.coupons = temp;
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

