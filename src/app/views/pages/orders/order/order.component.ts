import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Order} from '../../../../core/_models/order';
import {ActivatedRoute, Router} from '@angular/router';
import {ControlPageService} from '../../../../core/_helpers/control-page.service';
import {ToastrService} from 'ngx-toastr';
import {OrderApi} from '../../../../core/_api/order.api';
import {ProductApi} from '../../../../core/_api/product.api';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {handlingError} from '../../../../core/_helpers/handling-error.service';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  routeName = 'orders';
  public form: FormGroup;
  apiUrl = environment.apiUrl;

  id: any;
  image: any;
  isItemEdit = false;
  isLoading = false;
  item: Order;
  order: any = {};
  user: any = {};
  allStatus = [];


  displayedColumns = [
    'image',
    'sku',
    'code',
    'quantity',
    'price',
    'new_price',
    'color',
    'size',
    'total_price',

  ];
  orderRows = [];
  dataSourceAll = new MatTableDataSource<any>(this.orderRows);

  @ViewChild('openDialogImage', {static: false}) openDialogImage: TemplateRef<any>;
  products = [];

  constructor(
    private router: Router,
    private controlPageService: ControlPageService,
    private toastr: ToastrService,
    private orderApi: OrderApi,
    private productApi: ProductApi,
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(params => {
      this.id = params.orderId;
      this.getListStatus();
      this.get();
    });
  }


  ngOnInit() {
    this.setBreadcrumbs();
  }

  getListStatus() {
    this.orderApi.listStatus().subscribe((data: any) => {
      this.allStatus = data;
    });
  }

  get() {

    this.orderApi.getById(this.id).subscribe((data: any) => {
        this.order = this.item = data.data;
        this.orderRows = this.order.order_rows;
        this.user = this.order.user;
        // this.id = this.item.id;
        this.dataSourceAll = new MatTableDataSource<any>(this.orderRows);
      },
      (error: any) => {
        handlingError(error, this.toastr, this.router);
      },
      () => {
        this.setBreadcrumbs();
      });
  }


  changeStatus(orderId, itemId) {

    this.orderApi.changeStatus(orderId, itemId).subscribe((data: any) => {
        this.toastr.success('Status Updated successfully.', 'Success');
        this.get();
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
    breadcrumbArray[2] = {
      label: this.isItemEdit ? 'Update ' + this.routeName : 'Create ' + this.routeName,
      url: '',
      params: []
    };
    this.controlPageService.setBreadcrumb(breadcrumbArray);
  }

}
