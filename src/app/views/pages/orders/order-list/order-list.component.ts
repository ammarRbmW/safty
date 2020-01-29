import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {MatDialog, MatTableDataSource, PageEvent} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {ControlPageService} from '../../../../core/_helpers/control-page.service';
import {ToastrService} from 'ngx-toastr';
import {OrderApi} from '../../../../core/_api/order.api';
import {DialogComponent} from '../../../shared/dialog/dialog.component';
import {handlingError} from '../../../../core/_helpers/handling-error.service';
import {ColumnMode} from '@swimlane/ngx-datatable';
import {QuestionApi} from '../../../../core/_api/question.api';

declare var require: any;

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
})
export class OrderListComponent implements OnInit {

  apiUrl = environment.apiUrl;
  url: string = this.apiUrl + '/orders';
  routeName = 'orders';

  orders = [];
  allStatus = [];
  displayedColumns = [
    'user',
    'coupons_id',
    'discount',
    'sub_total',
    'payment_fee',
    'shipment_fee',
    'tax_total',
    'total',
    'order_status',
    'action'
  ];
  dataSourceAll = new MatTableDataSource<any>(this.orders);


  // MatPaginator Inputs
  length: number;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 25, 100];
  currentPageInfo = {
    pageIndex: 1,
    pageSize: this.pageSize
  };
  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(
    private router: Router,
    public controlPageService: ControlPageService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    public orderApi: OrderApi,
    private route: ActivatedRoute,
  ) {

    this.route.queryParams.subscribe(params => {
      console.log(params.page);
    });

    this.controlPageService.setCreateLink(null);
    this.getListStatus();
  }

  public getServerData(event?: PageEvent) {
    this.currentPageInfo.pageIndex = event.pageIndex;
    this.currentPageInfo.pageSize = event.pageSize;
    this.getOrder(event.pageIndex + 1, event.pageSize);
    return event;
  }

  ngOnInit(): void {
    this.getOrder(1, this.pageSize);
    this.setBreadcrumbs();
  }

  getOrder(page = null, per_page = null) {

    this.orderApi.list(page, per_page).subscribe(
      (data: any) => {
        this.orders = data.data;
        this.dataSourceAll = new MatTableDataSource<any>(this.orders);
        this.length = data.meta.total;
      }
    );
  }


  changeStatus(orderId, itemId) {

    this.orderApi.changeStatus(orderId, itemId).subscribe((data: any) => {
        this.getOrder(this.currentPageInfo.pageIndex, this.currentPageInfo.pageSize);
        this.toastr.success('Status Updated successfully.', 'Success');
      },
      (error: any) => {
        handlingError(error, this.toastr, this.router);
      },
      () => {
      });
  }

  getListStatus() {
    this.orderApi.listStatus().subscribe((data: any) => {
      this.allStatus = data;
    });
  }

  getOrdersStatuses(orderId, itemId) {

    this.orderApi.changeStatus(orderId, itemId).subscribe((data: any) => {
        this.getOrder(this.currentPageInfo.pageIndex + 1, this.currentPageInfo.pageSize);
        this.toastr.success('Status Updated successfully.', 'Success');
      },
      (error: any) => {
        handlingError(error, this.toastr, this.router);
      },
      () => {
      });
  }

  setBreadcrumbs() {
    const breadcrumbArray = [];
    breadcrumbArray[0] = {label: 'Home', url: '/home', params: []};
    breadcrumbArray[1] = {label: this.routeName, url: '/' + this.routeName, params: []};

    this.controlPageService.setBreadcrumb(breadcrumbArray);
  }
}
