import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatTableDataSource, PageEvent} from '@angular/material';
import {environment} from '../../../../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import {ControlPageService} from '../../../../core/_helpers/control-page.service';
import {ToastrService} from 'ngx-toastr';
import {UserApi} from '../../../../core/_api/user.api';
import {FormControl} from '@angular/forms';
import {RoleApi} from '../../../../core/_api/role.api';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {

  apiUrl = environment.apiUrl;
  url: string = this.apiUrl + '/users';
  routeName = 'users';

  users = [];
  roles = [];
  roleSelect = new FormControl();

  displayedColumns = [
    'photo',
    'username',
    'email',
    'name',
    'mobile',
    'birthday',
    'home_address1',
    'action'
  ];
  dataSourceAll = new MatTableDataSource<any>(this.users);


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
    public userApi: UserApi,
    public roleApi: RoleApi,
    private route: ActivatedRoute,
  ) {
 
    this.controlPageService.setCreateLink(null);
  }

  public getServerData(event?: PageEvent) {
    this.currentPageInfo.pageIndex = event.pageIndex;
    this.currentPageInfo.pageSize = event.pageSize;
    // this.getUser(event.pageIndex + 1, event.pageSize);
    this.getUser(event.pageIndex + 1, event.pageSize);
    return event;
  }

  getUsersByRole() {

    this.roleApi.getUsersRole(this.roleSelect.value).subscribe(
      (data: any) => {
        this.users = data.data;
        this.dataSourceAll = new MatTableDataSource<any>(this.users);
      }
    );
  }

  ngOnInit(): void {
    this.getRoles();
    this.getUser(1, this.pageSize);
    this.setBreadcrumbs();
  }

  getUser(page = null, per_page = null) {

    this.userApi.allUsers(page, per_page).subscribe(
      (data: any) => {
        this.users = data.data;
        this.dataSourceAll = new MatTableDataSource<any>(this.users);
        this.length = data.meta.total;
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


  setBreadcrumbs() {
    const breadcrumbArray = [];
    breadcrumbArray[0] = {label: 'Home', url: '/home', params: []};
    breadcrumbArray[1] = {label: this.routeName, url: '/' + this.routeName, params: []};

    this.controlPageService.setBreadcrumb(breadcrumbArray);
  }
}
