import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {environment} from '../../../../../environments/environment';
import {User} from '../../../../core/_models/user';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {ControlPageService} from '../../../../core/_helpers/control-page.service';
import {ToastrService} from 'ngx-toastr';
import {UserApi} from '../../../../core/_api/user.api';
import {ProductApi} from '../../../../core/_api/product.api';
import {handlingError} from '../../../../core/_helpers/handling-error.service';
import {RoleApi} from '../../../../core/_api/role.api';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {

  routeName = 'users';
  public form: FormGroup;
  apiUrl = environment.apiUrl;

  id: any;

  isLoading = false;
  item: User;
  roles: any = {};
  userRoles: any = [];
  user: any = {};

  roleSelect = new FormControl();

  displayedColumns = [
    'role_name',
    'action',
  ];

  userRows = [];
  dataSourceAll = new MatTableDataSource<any>(this.userRows);

  @ViewChild('openDialogImage', {static: false}) openDialogImage: TemplateRef<any>;
  products = [];

  constructor(
    private router: Router,
    private controlPageService: ControlPageService,
    private toastr: ToastrService,
    private userApi: UserApi,
    private roleApi: RoleApi,
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(params => {
      this.id = params.userId;
      this.get();
      this.getRoles();
      this.getUsersRole();
    });
  }


  ngOnInit() {
    this.setBreadcrumbs();
  }


  getUsersRole() {
    let rolesObject = [];
    let rolesIds = [];
    this.userApi.getUsersRole(this.id).subscribe(
      (data: any) => {
        rolesObject = data.data;
        rolesObject.forEach(function(value) {
          rolesIds.push(value.id);
        });
        console.log(rolesIds);
        this.userRoles = rolesIds;
        this.roleSelect.setValue(rolesIds);
      }
    );
  }

  getRoles() {

    this.roleApi.list().subscribe(
      (data: any) => {
        this.roles = data.data;
      }
    );
  }

  updateUserRoles() {

    this.userApi.updateUserRoles(this.id, this.roleSelect.value).subscribe(
      (data: any) => {
        this.toastr.success('Item updated successfully.', 'Success');
      },
      (error: any) => {
        handlingError(error, this.toastr, this.router);
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      });

  }

  get() {

    this.userApi.getById(this.id).subscribe((data: any) => {
        this.user = data.data;
      },
      (error: any) => {
        handlingError(error, this.toastr, this.router);
      },
      () => {
        this.setBreadcrumbs();
      });
  }

  delete(id, i) {

  }

  setBreadcrumbs() {
    const breadcrumbArray = [];
    breadcrumbArray[0] = {label: 'Home', url: '/home', params: []};
    breadcrumbArray[1] = {label: this.routeName, url: '/' + this.routeName, params: []};

    this.controlPageService.setBreadcrumb(breadcrumbArray);
  }

}
