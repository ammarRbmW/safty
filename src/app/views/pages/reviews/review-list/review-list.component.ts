import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {ControlPageService} from '../../../../core/_helpers/control-page.service';
import {ToastrService} from 'ngx-toastr';
import {ReviewApi} from '../../../../core/_api/review.api';
import {DialogComponent} from '../../../shared/dialog/dialog.component';
import {handlingError} from '../../../../core/_helpers/handling-error.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
})
export class ReviewListComponent implements OnInit {

  apiUrl = environment.apiUrl;
  url: string = this.apiUrl + '/reviews';
  reviewsAll: any[] = [];
  reviewsNotAnswer: any[] = [];
  reviewsAnswer: any[] = [];
  routeName = 'reviews';

  displayedColumns = ['review', 'rating', 'approved', 'user', 'product', 'updated_at', 'action'];

  dataSourceAll = new MatTableDataSource<any>(this.reviewsAll);
  dataSourceNotAnswer = new MatTableDataSource<any>(this.reviewsNotAnswer);
  dataSourceAnswer = new MatTableDataSource<any>(this.reviewsAnswer);


  constructor(
    private router: Router,
    public controlPageService: ControlPageService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    public reviewApi: ReviewApi,
    private route: ActivatedRoute,
  ) {
    this.controlPageService.setCreateLink('/' + this.routeName + '/create');

    this.getReview();
  }

  ngOnInit(): void {
    this.setBreadcrumbs();
  }

  getReview() {
    this.reviewApi.list().subscribe(
      (data: any) => {
        this.reviewsAll = data.data;
        this.dataSourceAll = new MatTableDataSource<any>(this.reviewsAll);
      }
    );
    this.reviewApi.listNotApproved().subscribe(
      (data: any) => {
        this.reviewsNotAnswer = data.data;
        this.dataSourceNotAnswer = new MatTableDataSource<any>(this.reviewsNotAnswer);
      }
    );
    this.reviewApi.listApproved().subscribe(
      (data: any) => {
        this.reviewsAnswer = data.data;
        console.log(this.reviewsAnswer);
        this.dataSourceAnswer = new MatTableDataSource<any>(this.reviewsAnswer);
      }
    );
  }

  editItem(i, id) {
    alert('editItem: ' + i + id);
  }

  delete(itemId, index) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reviewApi.delete(itemId).subscribe((data: any) => {
            // const temp = [...this.reviewsAll];
            // temp.splice(index, 1);
            // this.reviewsAll = temp;
            // this.dataSourceAll = new MatTableDataSource<any>(this.reviewsAll);
            this.getReview();
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

