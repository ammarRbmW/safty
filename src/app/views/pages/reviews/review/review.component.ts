import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Question} from '../../../../core/_models/question';
import {ActivatedRoute, Router} from '@angular/router';
import {ControlPageService} from '../../../../core/_helpers/control-page.service';
import {ToastrService} from 'ngx-toastr';
import {QuestionApi} from '../../../../core/_api/question.api';
import {ProductApi} from '../../../../core/_api/product.api';
import {MatDialog} from '@angular/material';
import {handlingError} from '../../../../core/_helpers/handling-error.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
})
export class ReviewComponent implements OnInit {
  routeName = 'reviews';
  public form: FormGroup;

  id: any;
  image: any;
  isItemEdit = false;
  isAnswer = false;
  isLoading = false;
  item: Question;
  question = '';
  @ViewChild('openDialogImage', {static: false}) openDialogImage: TemplateRef<any>;
  productsSelect = new FormControl();
  products = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private controlPageService: ControlPageService,
    private toastr: ToastrService,
    private questionApi: QuestionApi,
    private productApi: ProductApi,
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ) {
    this.getAllProducts();
  }

  ngOnInit() {
    this.setBreadcrumbs();


    this.route.params.subscribe(params => {
      if (this.router.url.includes('/create')) {
        this.form = this.fb.group({
          question: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])],
          answer: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],
        });
      } else if (this.router.url.includes('/answer')) {
        this.form = this.fb.group({
          answer: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],
        });
        this.id = params.questionId;
        this.isAnswer = true;
        this.get();
      } else {
        this.form = this.fb.group({
          answer: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],
        });
        this.id = params.questionId;
        this.isItemEdit = true;
        this.get();
      }
    });

  }

  getAllProducts() {
    this.productApi.getAll().subscribe((data: any) => {
      this.products = data;
    });
  }

  get() {

    this.questionApi.getById(this.id).subscribe((data: any) => {
        this.item = data.data;
        this.question = this.item.question;
        if (!this.isItemEdit && !this.isAnswer) {
          this.form.controls.question.setValue(this.item.question);
        }
        this.form.controls.answer.setValue(this.item.answer);
        this.id = this.item.id;
      },
      (error: any) => {
        handlingError(error, this.toastr, this.router);
      },
      () => {
        this.setBreadcrumbs();
      });
  }

  store() {
    const item = {
      question: {
        question: null,
        answer: this.form.controls.answer.value,
        products_id: null,
      }
    };

    this.isLoading = true;
    if (this.isAnswer) {
      this.updateAnswer(item);
    } else if (this.isItemEdit) {
      this.update(item);
    } else {
      item.question.question = this.form.controls.question.value;
      item.question.products_id = this.productsSelect.value.id;
      this.create(item);
    }
    this.isLoading = false;
  }

  create(question) {
    this.questionApi.create(question).subscribe((data: any) => {
        this.form.reset();
        this.toastr.success('Item updated successfully.', 'Success');
        this.router.navigate([`/` + this.routeName]);
      },
      (error: any) => {
        handlingError(error, this.toastr, this.router);
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      });
  }

  update(item) {

    item.id = this.id;
    this.questionApi.update(item).subscribe((data: any) => {
        this.form.reset();
        this.toastr.success('Item updated successfully', 'success!');
        this.router.navigate([`/` + this.routeName]);
      },
      (error: any) => {
        handlingError(error, this.toastr, this.router);
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      });
  }

  updateAnswer(item) {
    const answer = {
      id: this.id,
      answer: item.question.answer
    };
    this.questionApi.updateAnswer(answer).subscribe((data: any) => {
        this.form.reset();
        this.toastr.success('Item updated successfully', 'success!');
        this.router.navigate([`/` + this.routeName]);
      },
      (error: any) => {
        handlingError(error, this.toastr, this.router);
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
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

