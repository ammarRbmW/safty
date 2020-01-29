import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-validation-message',
    templateUrl: './validation-message.component.html',
    styleUrls: ['./validation-message.component.scss']
})
export class ValidationMessageComponent implements OnInit {
    public form: FormGroup;

    @Input() field: string;
    @Input() theForm: FormGroup;

    constructor(private fb: FormBuilder) {

    }

    ngOnInit() {
        this.form = this.theForm;
    }

}
