import {Component, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.scss']
})
export class InputValidationComponent implements OnInit {
  public formGroup: FormGroup;

  @Input() field: string;
  @Input() placeholder: string;
  @Input() type = 'text';
  @Input() disabled = false;
  @Input() theForm: FormGroup;
  @Output() outForm: FormGroup;

  constructor(private fb: FormBuilder, public translate: TranslateService) {
    this.formGroup = this.theForm;

  }

  ngOnInit() {
    this.formGroup = this.theForm;
  }


}
