import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {environment} from '../../../../../environments/environment';
import {Question} from '../../../../core/_models/question';
import {ActivatedRoute, Router} from '@angular/router';
import {ControlPageService} from '../../../../core/_helpers/control-page.service';
import {ToastrService} from 'ngx-toastr';
import {QuestionApi} from '../../../../core/_api/question.api';
import {DialogComponent} from '../../../shared/dialog/dialog.component';
import {handlingError} from '../../../../core/_helpers/handling-error.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
})
export class QuestionListComponent implements OnInit, AfterViewInit {

  apiUrl = environment.apiUrl;
  imageViewUrl = this.apiUrl;
  url: string = this.apiUrl + '/questions';
  questionsAll: any[] = [];
  questionsNotAnswer: any[] = [];
  questionsAnswer: any[] = [];
  routeName = 'questions';

  displayedColumns = ['question', 'answer', 'product', 'user', 'answered_by', 'updated_at', 'action'];

  dataSourceAll = new MatTableDataSource<any>(this.questionsAll);
  dataSourceNotAnswer = new MatTableDataSource<any>(this.questionsNotAnswer);
  dataSourceAnswer = new MatTableDataSource<any>(this.questionsAnswer);


  constructor(
    private router: Router,
    public controlPageService: ControlPageService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    public questionApi: QuestionApi,
    private route: ActivatedRoute,
  ) {
    this.controlPageService.setCreateLink('/' + this.routeName + '/create');

    this.getQuestion();
  }

  ngOnInit(): void {
    this.setBreadcrumbs();
  }

  getQuestion() {
    this.questionApi.list().subscribe(
      (data: any) => {
        this.questionsAll = data.data;
        this.dataSourceAll = new MatTableDataSource<any>(this.questionsAll);
      }
    );
    this.questionApi.listNotAnswer().subscribe(
      (data: any) => {
        this.questionsNotAnswer = data.data;
        this.dataSourceNotAnswer = new MatTableDataSource<any>(this.questionsNotAnswer);
      }
    );
    this.questionApi.listAnswer().subscribe(
      (data: any) => {
        this.questionsAnswer = data.data;
        console.log(this.questionsAnswer);
        this.dataSourceAnswer = new MatTableDataSource<any>(this.questionsAnswer);
      }
    );
  }

  ngAfterViewInit(): void {
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
        this.questionApi.delete(itemId).subscribe((data: any) => {
            // const temp = [...this.questionsAll];
            // temp.splice(index, 1);
            // this.questionsAll = temp;
            // this.dataSourceAll = new MatTableDataSource<any>(this.questionsAll);
            this.getQuestion();
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

